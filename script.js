const clean=s=>s.toUpperCase().replace(/[^A-Z0-9]/g,'');
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.getElementById(b.dataset.tab).classList.add('active')});
function getRails(){let r=parseInt(rfRails.value,10);if(!Number.isFinite(r)||r<2)r=2;rfRails.value=r;return r}
function railPattern(n,rails){if(rails<=1)return Array(n).fill(0);let pat=[],row=0,dir=1;for(let i=0;i<n;i++){pat.push(row);if(row===0)dir=1;else if(row===rails-1)dir=-1;row+=dir}return pat}
function showRails(chars,pat,rails,title='Zig-zag row arrangement'){let lines=Array.from({length:rails},()=>Array(chars.length).fill('  '));chars.forEach((c,i)=>lines[pat[i]][i]=c+' ');rfViz.innerHTML=`<div class='viz-title'>${title}</div><div class='rail'>${lines.map((line,r)=>`Row ${r+1}: ${line.join('')}`).join('\n')}</div>`}
function rfEncrypt(){let s=clean(rfText.value),rails=getRails();if(!s){rfOut.value='Enter text';rfViz.innerHTML='';return}if(rails>s.length)rails=s.length||2;let pat=railPattern(s.length,rails),rows=Array.from({length:rails},()=>[]);[...s].forEach((c,i)=>rows[pat[i]].push(c));rfOut.value=rows.flat().join('');showRails([...s],pat,rails,`Encrypt with ${rails} rows — write in zig-zag, then read row by row`) }
function rfDecrypt(){let c=clean(rfText.value),rails=getRails();if(!c){rfOut.value='Enter ciphertext';rfViz.innerHTML='';return}if(rails>c.length)rails=c.length||2;let pat=railPattern(c.length,rails),counts=Array(rails).fill(0);pat.forEach(r=>counts[r]++);let rows=[],p=0;counts.forEach(n=>{rows.push(c.slice(p,p+n).split(''));p+=n});let used=Array(rails).fill(0),out=[];pat.forEach(r=>out.push(rows[r][used[r]++]));rfOut.value=out.join('');showRails(out,pat,rails,`Decrypt with ${rails} rows — reconstruct zig-zag positions from ciphertext`) }
function keyOrder(k){return [...k].map((c,i)=>({c,i})).sort((a,b)=>a.c.localeCompare(b.c)||a.i-b.i).map(x=>x.i)}
function colEncrypt(){let s=clean(colText.value),k=clean(colKey.value);if(!k)return colOut.value='Enter a keyword';let cols=k.length,rows=Math.ceil(s.length/cols),grid=Array.from({length:rows},(_,r)=>Array.from({length:cols},(_,c)=>s[r*cols+c]||'')),ord=keyOrder(k),out='';ord.forEach(c=>grid.forEach(r=>out+=r[c]||''));colOut.value=out;showGrid(grid,k,ord)}
function colDecrypt(){let c=clean(colText.value),k=clean(colKey.value);if(!k)return colOut.value='Enter a keyword';let m=k.length,n=c.length,rows=Math.ceil(n/m),full=n%m||m,lens=Array(m).fill(rows-1);for(let i=0;i<full;i++)lens[i]=rows;let ord=keyOrder(k),cols=Array(m),p=0;ord.forEach(idx=>{cols[idx]=c.slice(p,p+lens[idx]).split('');p+=lens[idx]});let out='',grid=[];for(let r=0;r<rows;r++){let row=[];for(let j=0;j<m;j++){let ch=cols[j][r]||'';row.push(ch);out+=ch}grid.push(row)}colOut.value=out;showGrid(grid,k,ord)}
function showGrid(g,k,ord){let rank=Array(k.length);ord.forEach((idx,r)=>rank[idx]=r+1);let h='<div>';[...k].forEach((x,i)=>h+=`<span class=cell><b>${x}</b><br><small>${rank[i]}</small></span>`);h+='</div>';g.forEach(r=>{h+='<div>';r.forEach(x=>h+=`<span class=cell>${x||'·'}</span>`);h+='</div>'});colViz.innerHTML=h}
const qs=[['A transposition cipher primarily changes…',['Character values','Character positions','Alphabet size'],1],['In Rail Fence, the row count controls…',['The zig-zag permutation pattern','The alphabet used','RSA key generation'],0],['Columnar read order is determined by…',['Message length only','Alphabetical order of keyword letters','Random numbers'],1],['Decryption should…',['Reverse the permutation','Hash the ciphertext','Delete repeated letters'],0],['In this simulator duplicate key letters are ordered…',['Right-to-left','Randomly','Left-to-right'],2]];
quizBox.innerHTML=qs.map((q,i)=>`<div class=q><b>${i+1}. ${q[0]}</b>${q[1].map((a,j)=>`<label class='quiz-option' data-q='q${i}' data-index='${j}'><input type=radio name=q${i} value=${j}> ${a}</label>`).join('')}</div>`).join('');
function gradeQuiz(){
  let n=0;
  qs.forEach((q,i)=>{
    const opts=document.querySelectorAll(`.quiz-option[data-q='q${i}']`);
    const selected=document.querySelector(`input[name=q${i}]:checked`);
    const userChoice=selected?Number(selected.value):-1;
    if(userChoice===q[2])n++;

    opts.forEach((opt)=>{
      const idx=Number(opt.dataset.index);
      const input=opt.querySelector('input');
      const isCorrect=idx===q[2];
      const isSelected=userChoice===idx;

      opt.style.margin='0 0 12px';
      opt.style.padding='0';
      opt.style.borderRadius='0';
      opt.style.transition='all 0.2s ease';
      opt.style.background='';
      opt.style.border='';
      opt.style.fontWeight='';

      if(isCorrect){
        opt.style.background='#dff5e4';
        opt.style.border='1px solid #5ca96d';
      }
      if(isSelected && !isCorrect){
        opt.style.background='#fde2e2';
        opt.style.border='1px solid #d56666';
      }
      if(isSelected || isCorrect){
        opt.style.fontWeight='bold';
      }

      input.disabled=true;
    });
  });

  const prev=document.querySelector('.correct-answer-summary');
  if(prev)prev.remove();

  const summary=document.createElement('div');
  summary.className='correct-answer-summary';
  summary.innerHTML='Correct answers:<br>' + qs.map((q,i)=>`${i+1}. ${q[1][q[2]]}`).join('<br>');
  score.parentNode.appendChild(summary);
  score.value=`Score: ${n}/${qs.length}`;
}
rfEncrypt();colEncrypt();
