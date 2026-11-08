// Optional local validation: node check-links.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const pages=['index.html','calculator/index.html','diversification/index.html'];
let count=0;
for(const page of pages){
  const source=fs.readFileSync(path.join(root,page),'utf8');
  assert.ok(!source.includes('__CURVE__'));
  for(const match of source.matchAll(/\b(?:href|src)="([^"]+)"/g)){
    const url=match[1];
    if(/^(?:https?:|data:|mailto:)/.test(url))continue;
    assert.ok(!url.startsWith('/'),'Use relative project paths: '+url);
    const [resource,anchor]=url.split('#');
    const resolved=path.resolve(root,path.dirname(page),resource||path.basename(page));
    assert.ok(fs.existsSync(resolved),page+' has a missing target: '+url);
    if(anchor){const target=fs.readFileSync(resolved,'utf8');assert.ok(target.includes('id="'+anchor+'"'),'Missing anchor '+url);}
    count++;
  }
  for(const match of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
}
assert.ok(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('Ventures in Business Engineering'));
console.log(`Passed ${count} local link/asset checks. All inline JavaScript parses.`);
