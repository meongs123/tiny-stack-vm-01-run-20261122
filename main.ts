let F=require('fs');let{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
function R(p,g){
let A=new Int32Array(576),o=Buffer.alloc(1<<16),Y=Buffer.from('AWsAAKqpqaioAAAAFAAAAGAAAABR','base64'),n=p.length,w=0,h=0,j=0,k=0,l=0,e=10,a,b,v,y,m,q,u=x=>x>>>0,T=c=>{throw c};
try{for(q=1e6;q--;){
if(h<0||h>=n)T(9);
v=p[h++];
m=v==2?4:v==1?1:v>47&v<52?2:0;
if(m&&h+m>n)T(9);
y=Y[v>>2]>>6-2*(v&3)&3;
if(w<y)T(2);
if(w>255&&v==1|v==2|v==4|v==6|v==82)T(3);
if(!v)T(0);
else if(v<3)A[w++]=v==1?p.readInt8(h):p.readInt32LE(h),h+=m;
else if(v==3)w--;
else if(v==4)A[w++]=A[w-2];
else if(v==5){a=A[w-1];A[w-1]=A[w-2];A[w-2]=a}
else if(v==6)A[w++]=A[w-3];
else if(v==7){a=A[w-3];A[w-3]=A[w-2];A[w-2]=A[w-1];A[w-1]=a}
else if(v>15&v<35&v!=31){
if(v==23|v==27)A[w-1]=v==23?-A[w-1]:~A[w-1];
else{b=A[--w];a=A[w-1];if(v>18&v<23&!b)T(4);A[w-1]=[a+b,a-b,Math.imul(a,b),a/b|0,a%b,u(a)/u(b)|0,u(a)%u(b),,a&b,a|b,a^b,,a<<b,a>>b,a>>>b,,a==b,a<b,u(a)<u(b)][v-16]}}
else if(v>47&v<53){
if(v==51){if(j>63)T(7);A[256+j++]=h+2;h=p[h]|p[h+1]<<8}
else if(v==52){if(j==0)T(8);h=A[256+--j]}
else{b=p.readInt16LE(h);h+=2;if(v==48||(v==49)==!A[--w])h+=b}}
else if(v>63&v<66){a=A[w-1];if(a<0|a>255)T(6);if(v<65)A[w-1]=A[320+a];else{A[320+a]=A[w-2];w-=2}}
else if(v==80){a=String(A[--w]);if(k+a.length>65536)T(11);k+=o.write(a,k)}
else if(v==81){if(k>65535)T(11);o[k++]=A[--w]&255}
else if(v==82)A[w++]=l<g.length?g[l++]:-1;
else if(v==83)T(A[--w]&255);
else T(5);
}}catch(x){e=x}
return[e,o.subarray(0,k)]}
for(let d of F.readdirSync(I)){
let C=I+'/'+d,D=O+'/'+d,X=s=>{try{return F.readFileSync(C+'/'+s)}catch{return''}},[e,s]=R(X('program.bin'),X('input.bin'));
F.mkdirSync(D,{recursive:true});
F.writeFileSync(D+'/stdout.bin',s);
F.writeFileSync(D+'/exit.txt',e+'')}
