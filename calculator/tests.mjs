// Run with Node.js: node tests.mjs. No installation is required.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]);
for (const source of scripts) new vm.Script(source);
const context = {};
vm.runInNewContext(scripts[0], context);
const { solveTVM, npv, irr, expandCashFlows } = context.FinanceMath;
let count = 0;
function close(actual, expected, tolerance = 1e-8) {
  assert.ok(Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
  count++;
}
function throws(fn) { assert.throws(fn); count++; }
const bond = {n:20,iy:6,pv:0,pmt:25,fv:1000,m:2,begin:false};
const solved = solveTVM(bond,'pv');
close(solved.pv, -925.6126256977224, 1e-9);
close(solveTVM(solved,'iy').iy, 6, 1e-9);
close(solveTVM(solved,'n').n, 20, 1e-9);
close(solveTVM(solved,'pmt').pmt, 25, 1e-9);
close(solveTVM(solved,'fv').fv, 1000, 1e-8);
close(solveTVM({...bond,n:10,iy:5,pmt:0,m:1},'pv').pv, -1000/1.05**10, 1e-9);
close(solveTVM({...bond,n:10,iy:0,pmt:100,m:1},'pv').pv, -2000);
close(solveTVM({...bond,n:0,iy:0,pv:-2000,pmt:100,m:1},'n').n, 10);
close(solveTVM({...bond,n:360,iy:6,pv:300000,fv:0,m:12},'pmt').pmt, -1798.65157545827, 1e-8);
close(solveTVM({...bond,n:10,iy:5,pv:-1000,pmt:0,m:1},'fv').fv, 1000*1.05**10, 1e-9);
const due=solveTVM({...bond,begin:true},'pv');
close(due.pv, -25*(1-(1.03)**(-20))/.03*1.03-1000/(1.03)**20, 1e-9);
close(solveTVM(due,'n').n,20,1e-8);
close(solveTVM(due,'iy').iy,6,1e-8);
const negative=solveTVM({...bond,n:10,iy:-1,pmt:0,m:1},'pv');
close(solveTVM(negative,'iy').iy,-1,1e-8);
close(solveTVM({...bond,n:10,iy:0,pv:-1500,pmt:100,fv:500,m:1},'iy').iy,0,1e-8);
throws(()=>solveTVM({...bond,pv:1000},'iy'));
throws(()=>solveTVM({...bond,n:0},'pv'));
throws(()=>solveTVM({...bond,iy:-200},'pv'));
throws(()=>solveTVM({...bond,iy:0,pv:-1000,pmt:0,fv:1000},'n'));
throws(()=>solveTVM({...bond,n:1,pv:-100,pmt:100,fv:0,begin:true},'iy'));
close(npv(.1,[-1000,400,400,400]),-5.259203606310997,1e-9);
close(npv(0,[-1000,400,400,400]),200);
close(irr([-100,110]).roots[0],.1,1e-10);
close(irr([-100,90]).roots[0],-.1,1e-10);
close(irr([-100,50,50]).roots[0],0,1e-10);
close(irr([-100,110,0]).roots[0],.1,1e-10);
const multiple=irr([-100,230,-132]);
assert.equal(multiple.roots.length,2);count++;
close(multiple.roots[0],.1,1e-9);close(multiple.roots[1],.2,1e-9);
const repeated=irr([-100,220,-121]);
assert.equal(repeated.roots.length,1);count++;close(repeated.roots[0],.1,1e-8);
assert.equal(irr([100,50,50]).status,'same-sign');count++;
assert.equal(irr([0,0,0]).status,'indeterminate');count++;
assert.equal(irr([-100,50,-100]).status,'not-found');count++;
const expanded=expandCashFlows(-1000,[{amount:300,repeat:5}]);
assert.deepEqual(Array.from(expanded),[-1000,300,300,300,300,300]);count++;
close(npv(.08,expanded),-1000+300*(1-1.08**-5)/.08,1e-8);
throws(()=>npv(-1,[-100,110]));
throws(()=>expandCashFlows(-100,[{amount:100,repeat:1.5}]));
throws(()=>expandCashFlows(-100,[{amount:100,repeat:601}]));
const ti=[-7000,3000,5000,5000,5000,5000,4000];
close(npv(.1,ti),12393.65,.005);
close(irr(ti).roots[0],.5563,.00005);
for (const m of [1,2,4,12]) for (const begin of [false,true]) for (const iy of [-2,0,3,12]) {
  const input={n:7*m,iy,pv:0,pmt:40,fv:1000,m,begin};
  const answer=solveTVM(input,'pv');
  close(solveTVM(answer,'iy').iy,iy,1e-7);
  close(solveTVM(answer,'n').n,input.n,1e-7);
  close(solveTVM(answer,'pmt').pmt,40,1e-8);
  close(solveTVM(answer,'fv').fv,1000,1e-7);
}
// An independent undiscounted cash-flow sum verifies the zero-rate case.
close(npv(0,[-20,0,5,10,30]),25);
console.log(`Passed ${count} numerical checks. Both embedded scripts parse successfully.`);
