let F=require('fs');let{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
function R(p,g){
let A=new Int32Array(512),o=Buffer.alloc(1<<16),J=[],n=p.length,w=0,h=0,k=0,l=0,e=10,a,b,v,m,q,u=x=>x>>>0,T=c=>{throw c};
try{for(q=1e6;q--;){
v=p[h];m=v==2?4:v==1?1:v>47&v<52?2:0;
if(h<0|h+m>=n)T(9);
h++;
if(m){b=p.readIntLE(h,m);h+=m}
if(w<(0x4500000009000000140000002a2a6a6aaa0000e940n>>BigInt(v+v)&3n))T(2);
if(!v)T(0);
else if(v<3)A[w++]=b;
else if(v==3)w--;
else if(v==4|v==6)A[w++]=A[w-v/2];
else if(v==5){[A[w-1],A[w-2]]=[A[w-2],A[w-1]]}
else if(v==7){[A[w-3],A[w-2],A[w-1]]=[A[w-2],A[w-1],A[w-3]]}
else if(v>15&v<35&v!=31){
if(v==23|v==27)A[w-1]=v==23?-A[w-1]:~A[w-1];
else{b=A[--w];a=A[w-1];if(v>18&v<23&!b)T(4);A[w-1]=[a+b,a-b,Math.imul(a,b),a/b|0,a%b,u(a)/u(b)|0,u(a)%u(b),,a&b,a|b,a^b,,a<<b,a>>b,a>>>b,,a==b,a<b,u(a)<u(b)][v-16]}}
else if(v>47&v<53){
if(v==51){if(J.push(h)>64)T(7);h=b&65535}
else if(v==52){h=J.pop()??T(8)}
else{if(v==48||(v==49)==!A[--w])h+=b}}
else if(v>63&v<66){a=A[w-1];if(a>>>8)T(6);if(v&1){A[256+a]=A[w-2];w-=2}else A[w-1]=A[256+a]}
else if(v==80){a=''+A[--w];if(k+a.length>65536)T(11);k+=o.write(a,k)}
else if(v==81){if(k>65535)T(11);o[k++]=A[--w]}
else if(v==82)A[w++]=l<g.length?g[l++]:-1;
else if(v==83)T(A[--w]&255);
else T(5);
if(w>256)T(3);
}}catch(x){e=x}
return[e,o.subarray(0,k)]}
for(let d of F.readdirSync(I)){
let C=I+'/'+d,D=O+'/'+d,X=s=>{try{return F.readFileSync(C+'/'+s)}catch{return''}},[e,s]=R(X('program.bin'),X('input.bin'));
F.mkdirSync(D,{recursive:true});
F.writeFileSync(D+'/stdout.bin',s);
F.writeFileSync(D+'/exit.txt',e+'')}
