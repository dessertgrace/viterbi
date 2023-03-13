(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=e(i);fetch(i.href,l)}})();function g(){}function lt(t){return t()}function et(){return Object.create(null)}function _e(t){t.forEach(lt)}function at(t){return typeof t=="function"}function D(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let fe;function pt(t,n){return fe||(fe=document.createElement("a")),fe.href=n,t===fe.href}function gt(t){return Object.keys(t).length===0}function mt(t,...n){if(t==null)return g;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function o(t,n){t.appendChild(n)}function $(t,n,e){t.insertBefore(n,e||null)}function v(t){t.parentNode&&t.parentNode.removeChild(t)}function ct(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function d(t){return document.createElement(t)}function w(t){return document.createTextNode(t)}function h(){return w(" ")}function ve(t,n,e,s){return t.addEventListener(n,e,s),()=>t.removeEventListener(n,e,s)}function u(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function bt(t){return Array.from(t.childNodes)}function ut(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function ye(t,n,e,s){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,s?"important":"")}function be(t,n,e){t.classList[e?"add":"remove"](n)}let xe;function P(t){xe=t}const q=[],tt=[];let G=[];const nt=[],_t=Promise.resolve();let $e=!1;function vt(){$e||($e=!0,_t.then(dt))}function Ce(t){G.push(t)}const we=new Set;let N=0;function dt(){if(N!==0)return;const t=xe;do{try{for(;N<q.length;){const n=q[N];N++,P(n),yt(n.$$)}}catch(n){throw q.length=0,N=0,n}for(P(null),q.length=0,N=0;tt.length;)tt.pop()();for(let n=0;n<G.length;n+=1){const e=G[n];we.has(e)||(we.add(e),e())}G.length=0}while(q.length);for(;nt.length;)nt.pop()();$e=!1,we.clear(),P(t)}function yt(t){if(t.fragment!==null){t.update(),_e(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(Ce)}}function wt(t){const n=[],e=[];G.forEach(s=>t.indexOf(s)===-1?n.push(s):e.push(s)),e.forEach(s=>s()),G=n}const me=new Set;let $t;function E(t,n){t&&t.i&&(me.delete(t),t.i(n))}function pe(t,n,e,s){if(t&&t.o){if(me.has(t))return;me.add(t),$t.c.push(()=>{me.delete(t),s&&(e&&t.d(1),s())}),t.o(n)}else s&&s()}function ge(t){t&&t.c()}function L(t,n,e,s){const{fragment:i,after_update:l}=t.$$;i&&i.m(n,e),s||Ce(()=>{const r=t.$$.on_mount.map(lt).filter(at);t.$$.on_destroy?t.$$.on_destroy.push(...r):_e(r),t.$$.on_mount=[]}),l.forEach(Ce)}function j(t,n){const e=t.$$;e.fragment!==null&&(wt(e.after_update),_e(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function Ct(t,n){t.$$.dirty[0]===-1&&(q.push(t),vt(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function W(t,n,e,s,i,l,r,a=[-1]){const f=xe;P(t);const c=t.$$={fragment:null,ctx:[],props:l,update:g,not_equal:i,bound:et(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:et(),dirty:a,skip_bound:!1,root:n.target||f.$$.root};r&&r(c.root);let y=!1;if(c.ctx=e?e(t,n.props||{},(p,b,..._)=>{const S=_.length?_[0]:b;return c.ctx&&i(c.ctx[p],c.ctx[p]=S)&&(!c.skip_bound&&c.bound[p]&&c.bound[p](S),y&&Ct(t,p)),b}):[],c.update(),y=!0,_e(c.before_update),c.fragment=s?s(c.ctx):!1,n.target){if(n.hydrate){const p=bt(n.target);c.fragment&&c.fragment.l(p),p.forEach(v)}else c.fragment&&c.fragment.c();n.intro&&E(t.$$.fragment),L(t,n.target,n.anchor,n.customElement),dt()}P(f)}class O{$destroy(){j(this,1),this.$destroy=g}$on(n,e){if(!at(e))return g;const s=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return s.push(e),()=>{const i=s.indexOf(e);i!==-1&&s.splice(i,1)}}$set(n){this.$$set&&!gt(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}function xt(t){let n,e,s,i,l;return{c(){n=d("button"),e=w("count is "),s=w(t[0])},m(r,a){$(r,n,a),o(n,e),o(n,s),i||(l=ve(n,"click",t[1]),i=!0)},p(r,[a]){a&1&&ut(s,r[0])},i:g,o:g,d(r){r&&v(n),i=!1,l()}}}function At(t,n,e){let s=0;return[s,()=>{e(0,s+=1)}]}class Tt extends O{constructor(n){super(),W(this,n,At,xt,D,{})}}const M=[];function kt(t,n=g){let e;const s=new Set;function i(a){if(D(t,a)&&(t=a,e)){const f=!M.length;for(const c of s)c[1](),M.push(c,t);if(f){for(let c=0;c<M.length;c+=2)M[c][0](M[c+1]);M.length=0}}}function l(a){i(a(t))}function r(a,f=g){const c=[a,f];return s.add(c),s.size===1&&(e=n(i)||g),a(t),()=>{s.delete(c),s.size===0&&e&&(e(),e=null)}}return{set:i,update:l,subscribe:r}}const ht=kt([]);function st(t,n,e){const s=t.slice();return s[4]=n[e],s[6]=e,s}function it(t){let n,e=t[4]+"",s,i,l,r;function a(){return t[3](t[6])}return{c(){n=d("button"),s=w(e),i=h(),u(n,"class","nuc svelte-17qgsk0"),be(n,"selected",t[0][t[6]])},m(f,c){$(f,n,c),o(n,s),o(n,i),l||(r=ve(n,"click",a),l=!0)},p(f,c){t=f,c&1&&be(n,"selected",t[0][t[6]])},d(f){f&&v(n),l=!1,r()}}}function Nt(t){let n,e=t[1],s=[];for(let i=0;i<e.length;i+=1)s[i]=it(st(t,e,i));return{c(){n=d("div");for(let i=0;i<s.length;i+=1)s[i].c();u(n,"class","wrapper svelte-17qgsk0"),u(n,"id","nucWrap")},m(i,l){$(i,n,l);for(let r=0;r<s.length;r+=1)s[r]&&s[r].m(n,null)},p(i,[l]){if(l&7){e=i[1];let r;for(r=0;r<e.length;r+=1){const a=st(i,e,r);s[r]?s[r].p(a,l):(s[r]=it(a),s[r].c(),s[r].m(n,null))}for(;r<s.length;r+=1)s[r].d(1);s.length=e.length}},i:g,o:g,d(i){i&&v(n),ct(s,i)}}}let Mt="ATTCCGCGTATCCGGGGTTATGCGCCTTCCCCC";function qt(t,n,e){let s=[],i=Mt.split("");i.forEach(function(a,f){s.push(!1)});const l=a=>{e(0,s[a]=!s[a],s),ht.update(f=>s),console.log(s)};return[s,i,l,a=>{l(a)}]}class Gt extends O{constructor(n){super(),W(this,n,qt,Nt,D,{})}}function Dt(t){let n,e,s,i,l;return{c(){n=d("button"),e=w("count is "),s=w(t[0])},m(r,a){$(r,n,a),o(n,e),o(n,s),i||(l=ve(n,"click",t[1]),i=!0)},p(r,[a]){a&1&&ut(s,r[0])},i:g,o:g,d(r){r&&v(n),i=!1,l()}}}function St(t,n,e){let s=0;return[s,()=>{e(0,s+=1)}]}class Ht extends O{constructor(n){super(),W(this,n,St,Dt,D,{})}}function ot(t,n,e){const s=t.slice();return s[6]=n[e],s[8]=e,s}function rt(t){let n,e=t[6]+"",s,i,l,r;function a(){return t[5](t[8])}return{c(){n=d("button"),s=w(e),i=h(),u(n,"class","nuc svelte-17qgsk0"),be(n,"selected",t[1][t[8]])},m(f,c){$(f,n,c),o(n,s),o(n,i),l||(r=ve(n,"click",a),l=!0)},p(f,c){t=f,c&2&&be(n,"selected",t[1][t[8]])},d(f){f&&v(n),l=!1,r()}}}function Et(t){let n,e=t[2],s=[];for(let i=0;i<e.length;i+=1)s[i]=rt(ot(t,e,i));return{c(){n=d("div");for(let i=0;i<s.length;i+=1)s[i].c();u(n,"class","wrapper svelte-17qgsk0"),u(n,"id","nucWrap")},m(i,l){$(i,n,l);for(let r=0;r<s.length;r+=1)s[r]&&s[r].m(n,null)},p(i,[l]){if(l&14){e=i[2];let r;for(r=0;r<e.length;r+=1){const a=ot(i,e,r);s[r]?s[r].p(a,l):(s[r]=rt(a),s[r].c(),s[r].m(n,null))}for(;r<s.length;r+=1)s[r].d(1);s.length=e.length}},i:g,o:g,d(i){i&&v(n),ct(s,i)}}}let Lt="ATTCCGCGTATCCGGGGTTATGCGCCTTCCCCC";function jt(t,n,e){let s,i=g,l=()=>(i(),i=mt(r,p=>e(4,s=p)),r);t.$$.on_destroy.push(()=>i());let{hiddenStates:r}=n;l();let a=[],f=Lt.split("");f.forEach(function(p,b){a.push(!1)});const c=p=>{e(1,a[p]=!a[p],a)},y=p=>{c(p)};return t.$$set=p=>{"hiddenStates"in p&&l(e(0,r=p.hiddenStates))},t.$$.update=()=>{t.$$.dirty&16&&s.length>0&&s.forEach(function(p,b){e(1,a[b]=p,a)})},[r,a,f,c,s,y]}class Pt extends O{constructor(n){super(),W(this,n,jt,Et,D,{hiddenStates:0})}}function Wt(t){let n,e,s,i,l,r,a,f,c,y,p,b,_,S,I,Ae,H,Te,B,ke,z,Ne,R,Me,V,qe,Y,Ge,U,De,F,Se,J,He,K,C,Ee,Q,Le,X,je,Z,Pe,ee,We,te,Oe,x,Ie,Be,ne,ze,se,Re,ie,Ve,A,Ye,oe,Ue,re,Fe,le,Je,T,Ke,ae,Qe,ce,Xe,ue,k,Ze,de,he;return C=new Gt({}),A=new Ht({}),T=new Pt({props:{hiddenStates:ht}}),k=new Tt({}),{c(){n=d("main"),e=d("body"),s=d("h1"),s.textContent="Viterbi Decoding",i=h(),l=d("p"),l.innerHTML="<em>Suppose you are a world-famous computational biologist.</em>",r=h(),a=d("p"),a.innerHTML="You recently discovered a new species of <strong>Archaea</strong>, single-celled microorganisms that make up one of the main domains of life on earth. This Archaea was found living in an extreme environment of high pressure and high temperature near hydrothermal vents (underwater volcanoes!). Archaea are distinct from other domains of life because they lack of nuclei (and any interior membranes) and have unique protein composition.",f=h(),c=d("div"),c.innerHTML=`<div style="max-height:400px" class="innerimage svelte-9cd7al"><img style="max-height:400px" src="./src/assets/lokiCastle.jpeg" alt="loki&#39;s castle underwater hydrothermal vent structure" class="svelte-9cd7al"/></div> 
      <div style="max-height:400px" class="innerimage svelte-9cd7al"><img style="max-height:400px" src="./src/assets/archaea.jpeg" alt="Archaea clip art with labelled parts" class="svelte-9cd7al"/></div>`,y=h(),p=d("p"),p.textContent=`Your friend was able to sequence large sequences of DNA, the genetic code of cellular function, from this archaea. 
      Now with the DNA you have to figure out all that you can about this new species.  
      How does it survive in such extreme temperatures? 
      What makes it different from other species of Archaea? 
      How is it evolutionarily related to other species and other domains of life?`,b=h(),_=d("p"),_.innerHTML="<em>Welcome to the Great Archaea Mystery.</em>",S=h(),I=d("h2"),I.textContent="Biology Background",Ae=h(),H=d("div"),H.innerHTML='<img style="max-height:400px" src="./src/assets/DNA.jpeg" alt="Diagram of DNA, RNA, amino-acid sequence, and protein" class="svelte-9cd7al"/>',Te=h(),B=d("p"),B.textContent=`Image caption: 
      DNA is a double-stranded chain of nucleotides that contains the genetic instructions for an organism. 
      There are four nucleotides found in DNA: adenine (A), tyenine (T), guanene (G), and cytosine (C). 
      We can study DNA as a sequence of these values, which makes up a code to direct all protein synthesis and functionality for the cell.`,ke=h(),z=d("p"),z.textContent="Archaea have a single circular chromosome of DNA that can be anywhere from 0.5-7 million base pairs long, depending on the species. DNA is organized into small regions based on standard codes that perform different functions, such as initiating replication or coding for protein synthesis.",Ne=h(),R=d("p"),R.textContent=`The "Central Dogma" of biology describes the core understanding of information flow in cells. 
      DNA contains the base genetic instructions for all cellular functionality. 
      Some DNA is transcribed into RNA, which allows for increased control and regulation of many cellular processes including protein synthesis. 
      Some RNA, called messenger-RNA, is translated into protein. 
      Proteins make up the majority of structure and function of cells and are hugely diverse and highly-regulated for control and responsiveness of cellular processes.
      While we understand this the basic flow of information in cells, the details of regulation and control of transcription, translation, and protein functionality are hugely complex and the subject of much current cutting-edge research.`,Me=h(),V=d("h2"),V.textContent="Identifying gene-coding regions",qe=h(),Y=d("p"),Y.textContent=`Given our Archaeal DNA, we want to find protein-coding regions and classify them into categories to better understand their function. 
      By recognizing certain patterns of nucleotides that are associated with known protein functionality, we can start to understand this DNA.`,Ge=h(),U=d("p"),U.textContent="Structural-protein encoding genes are known to have higher GC content than other genes in organisms that live at high temperatures and pressures.",De=h(),F=d("p"),F.textContent="The question is: given our DNA sequences, which stretches of nucleotides encode structural-proteins?",Se=h(),J=d("p"),J.textContent="What sequence of hidden states do you think is most probable? Select each nucleotide that you think is in a high-GC region.",He=h(),K=d("div"),ge(C.$$.fragment),Ee=h(),Q=d("p"),Q.textContent=`You might first select all G and C nucleotides. 
      But what makes this unlikely? 
      Protein-encoding regions are known to be relatively long (often > 100 nucleotides in length), so 
      the probability of transitioning between states after each nucleotide is low.
      Therefore, we expect large stretches of nucleotides in the same state even if there is a larger percentage of AT nucleotides in highGC regions.`,Le=h(),X=d("p"),X.innerHTML=`Depending on the probability of transitioning between states and the probability of seeing an A or T nucelotide in a high-GC region, the most likely sequence of states will differ.
      We call these the <strong>transition</strong> and <strong>emission probabilities</strong>. The tradeoffs between them represent the core statistical problem of this situation.`,je=h(),Z=d("p"),Z.textContent="We can use a statistical model to help us quantify and solve the problem.",Pe=h(),ee=d("h2"),ee.textContent="Hidden Markov Models",We=h(),te=d("p"),te.innerHTML=`Hidden Markov Models (HMMs) are popular statistical tools used to model a sequence of observations attributable to sequential hidden states. HMMs are a type of statistical model, a mathematical tool to represent events or observations as random variables with defined relationships and assumptions. 
        In HMMs, the <strong>core assumption</strong> is that the probability of each state depends only on the previous state, and the probability of each event depends only on the current state.`,Oe=h(),x=d("img"),Be=h(),ne=d("p"),ne.textContent=`We can depict HMMs with graph images, where the top row represents the sequence of hidden states (x_i), and the bottom row represents the observations (y_i) generated from those states. 
      Notice that the arrows represent dependence of one state/event on another.`,ze=h(),se=d("p"),se.textContent="Applying HMMs to our problem, the status of low- or high-GC region at every nucleotide are the hidden states, and the nucleotides observed are the resulting observations from each state.",Re=h(),ie=d("p"),ie.textContent="The transition and emission probabilities for low- and high-GC regions in Archaea are the following:",Ve=h(),ge(A.$$.fragment),Ye=h(),oe=d("p"),oe.textContent="The total probability of a sequence of hidden states will be the cumulative probability of each state transition and each observed emission. We can represent this probability with the following equation:",Ue=h(),re=d("p"),re.textContent="where __ is the ___ of __, and __ is the ___ of __.",Fe=h(),le=d("p"),le.textContent="Using this equation, calculate the probability of your selected sequence of hidden states given the following transition and emission probabilities.",Je=h(),ge(T.$$.fragment),Ke=h(),ae=d("h2"),ae.textContent="The Viterbi Algorithm",Qe=h(),ce=d("p"),ce.textContent=`The Viterbi Algorithm is used to determine the most likely sequence of hidden states generated by a sequence of observations. 
      By taking advantage of the optimal substructure of the path optimization problem, 
      this algorithm can compute the best path very efficiently compared to the brute-force method.`,Xe=h(),ue=d("div"),ge(k.$$.fragment),Ze=h(),de=d("footer"),de.innerHTML=`<p class="svelte-9cd7al"><strong>by Grace Dessert</strong></p> 
    <p class="svelte-9cd7al"><strong>March 2023</strong></p> 
    <br/> 
    <h3>Thanks for engaging with this interactive lesson!</h3> 
    <h3>Thank you to my sister Juju for help with biology and inspiration to study Archaea.</h3> 
    <h3>This lesson is based on the following Nature publication:</h3> 
    <h3>References:</h3> 
    <ul><li><a href="https://avikdas.com/assets/images/2019-06-24-dynamic-programming-for-machine-learning-hidden-markov-models/hmm-bare.png">HMM Image</a></li> 
      <li><a href="https://www.cis.upenn.edu/~cis2620/notes/Example-Viteri-DNA.pdf">UPenn Viterbi Example</a></li> 
    <li><a href="https://images.allthescience.org/slideshow-mobile-small/archaebacteria-diagram.jpg">Archaea Image</a></li> 
      <li><a href="https://media.npr.org/assets/img/2015/05/05/lokis-castle_custom-7e6ab7912fe71c61c115ccc29515ec924140f561.jpg">Loki&#39;s Castle Image</a></li> 
    <li><a href="https://astrobiochem.files.wordpress.com/2019/02/sample-essay-on-regulation-of-gene-expression.jpg?w=810">DNA image</a></li></ul>`,ye(l,"text-align","center"),u(l,"class","svelte-9cd7al"),u(a,"class","svelte-9cd7al"),u(c,"class","imageWrap svelte-9cd7al"),u(p,"class","svelte-9cd7al"),ye(_,"text-align","center"),u(_,"class","svelte-9cd7al"),u(I,"class","svelte-9cd7al"),ye(H,"max-height","400px"),u(H,"class","innerimage svelte-9cd7al"),u(B,"class","svelte-9cd7al"),u(z,"class","svelte-9cd7al"),u(R,"class","svelte-9cd7al"),u(V,"class","svelte-9cd7al"),u(Y,"class","svelte-9cd7al"),u(U,"class","svelte-9cd7al"),u(F,"class","svelte-9cd7al"),u(J,"class","svelte-9cd7al"),u(K,"class","wrapDNA svelte-9cd7al"),u(Q,"class","svelte-9cd7al"),u(X,"class","svelte-9cd7al"),u(Z,"class","svelte-9cd7al"),u(ee,"class","svelte-9cd7al"),u(te,"class","svelte-9cd7al"),pt(x.src,Ie="./src/assets/HMM.png")||u(x,"src",Ie),u(x,"alt","diagram of HMM with three states and three observations"),u(x,"class","svelte-9cd7al"),u(ne,"class","svelte-9cd7al"),u(se,"class","svelte-9cd7al"),u(ie,"class","svelte-9cd7al"),u(oe,"class","svelte-9cd7al"),u(re,"class","svelte-9cd7al"),u(le,"class","svelte-9cd7al"),u(ae,"class","svelte-9cd7al"),u(ce,"class","svelte-9cd7al"),u(ue,"class","card"),u(e,"class","svelte-9cd7al"),u(de,"class","svelte-9cd7al"),u(n,"class","svelte-9cd7al")},m(m,ft){$(m,n,ft),o(n,e),o(e,s),o(e,i),o(e,l),o(e,r),o(e,a),o(e,f),o(e,c),o(e,y),o(e,p),o(e,b),o(e,_),o(e,S),o(e,I),o(e,Ae),o(e,H),o(e,Te),o(e,B),o(e,ke),o(e,z),o(e,Ne),o(e,R),o(e,Me),o(e,V),o(e,qe),o(e,Y),o(e,Ge),o(e,U),o(e,De),o(e,F),o(e,Se),o(e,J),o(e,He),o(e,K),L(C,K,null),o(e,Ee),o(e,Q),o(e,Le),o(e,X),o(e,je),o(e,Z),o(e,Pe),o(e,ee),o(e,We),o(e,te),o(e,Oe),o(e,x),o(e,Be),o(e,ne),o(e,ze),o(e,se),o(e,Re),o(e,ie),o(e,Ve),L(A,e,null),o(e,Ye),o(e,oe),o(e,Ue),o(e,re),o(e,Fe),o(e,le),o(e,Je),L(T,e,null),o(e,Ke),o(e,ae),o(e,Qe),o(e,ce),o(e,Xe),o(e,ue),L(k,ue,null),o(n,Ze),o(n,de),he=!0},p:g,i(m){he||(E(C.$$.fragment,m),E(A.$$.fragment,m),E(T.$$.fragment,m),E(k.$$.fragment,m),he=!0)},o(m){pe(C.$$.fragment,m),pe(A.$$.fragment,m),pe(T.$$.fragment,m),pe(k.$$.fragment,m),he=!1},d(m){m&&v(n),j(C),j(A),j(T),j(k)}}}class Ot extends O{constructor(n){super(),W(this,n,null,Wt,D,{})}}new Ot({target:document.getElementById("app")});
