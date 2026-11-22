let F=require('fs'),z=Buffer.alloc(0);let{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
let B=[(a,b)=>a+b,(a,b)=>a-b,Math.imul,(a,b)=>a/b|0,(a,b)=>a%b,(a,b)=>(a>>>0)/(b>>>0),(a,b)=>(a>>>0)%(b>>>0),0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31),0,(a,b)=>a==b,(a,b)=>a<b,(a,b)=>a>>>0<b>>>0];
function R(p,g){
let A=new Int32Array(576),o=Buffer.alloc(1<<16),n=p.length,q=0,w=0,h=0,j=0,k=0,l=0,e=0,a,b,v,y;
for(;;){
if(q==1e6||h<0||h>=n){e=q==1e6?10:9;break}
q++;v=p[h++];
let m=v==1?1:v==2?4:v>47&&v<52?2:0;
if(m&&h+m>n){e=9;break}
y=+"000112230000000022222221222122202220000000000000011000000000000012000000000000001101"[v];
if(w<y){e=2;break}
if((v==82||v<7&&v>0&&v!=3&&v!=5)&&w>255){e=3;break}
if(!v){e=0;break}
else if(v==1)A[w++]=(p[h++]<<24)>>24;
else if(v==2){A[w++]=p[h]|p[h+1]<<8|p[h+2]<<16|p[h+3]<<24;h+=4}
else if(v==3)w--;
else if(v==4){A[w]=A[w-1];w++}
else if(v==5){a=A[w-1];A[w-1]=A[w-2];A[w-2]=a}
else if(v==6){A[w]=A[w-2];w++}
else if(v==7){a=A[w-3];A[w-3]=A[w-2];A[w-2]=A[w-1];A[w-1]=a}
else if(v>15&&v<35&&v!=31){
if(v==23||v==27)A[w-1]=v==23?-A[w-1]:~A[w-1];
else{b=A[--w];a=A[w-1];if(v>18&&v<23&&!b){e=4;break}A[w-1]=B[v-16](a,b)}}
else if(v>47&&v<53){
if(v==48)h+=2+((p[h]|p[h+1]<<8)<<16>>16);
else if(v==49||v==50){a=A[--w];b=p[h]|p[h+1]<<8;h+=2;if(!a==(v==49))h+=(b<<16)>>16}
else if(v==51){if(j>63){e=7;break}A[256+j++]=h+2;h=p[h]|p[h+1]<<8}
else{if(j==0){e=8;break}h=A[256+--j]}}
else if(v>63&&v<66){a=A[w-1];if(a<0||a>255){e=6;break}if(v<65)A[w-1]=A[320+a];else{A[320+a]=A[w-2];w-=2}}
else if(v==80){a=String(A[--w]);if(k+a.length>65536){e=11;break}k+=o.write(a,k)}
else if(v==81){if(k>65535){e=11;break}o[k++]=A[--w]&255}
else if(v==82)A[w++]=l<g.length?g[l++]:-1;
else if(v==83){e=A[--w]&255;break}
else{e=5;break}}
return[e,o.subarray(0,k)]}
for(let d of F.readdirSync(I)){
let p,g;
try{p=F.readFileSync(I+'/'+d+'/program.bin')}catch{p=z}
try{g=F.readFileSync(I+'/'+d+'/input.bin')}catch{g=z}
let[e,s]=R(p,g);
F.mkdirSync(O+'/'+d,{recursive:true});
F.writeFileSync(O+'/'+d+'/stdout.bin',s);
F.writeFileSync(O+'/'+d+'/exit.txt',e+'')}
