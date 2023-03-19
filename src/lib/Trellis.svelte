<script>
    import Katex from 'svelte-katex'
    import Collap2 from './Collap2.svelte';
    import Increment from './Increment.svelte';

    let activeCircles1 = [];
    let activeCircles2 = [];
    let activeLines = [[],[],[],[]];

    let count = 1;

    $: {
        for (let i = 0; i<nucsS.length; i++) {
            if (i+1 <= count) {
                activeCircles1[i] = true;
                activeCircles2[i] = true;
                activeLines[0][i] = true;
                activeLines[1][i] = true;
                activeLines[2][i] = true;
                activeLines[3][i] = true;
            } else {
                activeCircles1[i] = false;
                activeCircles2[i] = false;
                activeLines[0][i] = false;
                activeLines[1][i] = false;
                activeLines[2][i] = false;
                activeLines[3][i] = false;
            }
        }
    }

    let DNA = "ATTCTACGACGCGCCGCCCACGTCAAGCTATTCAA";
    
    let nucsS = DNA.split("");
    let nucsSm1 = nucsS.slice(1,(nucsS.length));

    let expanded = [false, false];

    nucsS.forEach( function (nucS, index) {
        activeCircles1.push(false);
        activeCircles2.push(false);
    })

    nucsS.forEach( function (nucS, index) {
        activeLines[0].push(false);
        activeLines[1].push(false);
        activeLines[2].push(false);
        activeLines[3].push(false);
    })

  </script>
  
  <div class="wrapper"> 

    <div class="scrollR">

        <div id="row0">
            <div class="rowLab"> 
                Nucleotide:
            </div>
            {#each nucsS as name, index}
            <div class="elem"> 
                {name}
            </div>
            {/each}
        </div>

        <div id="row1"> 
            <div class="rowLab"> 
                lowGC:
            </div>
            <div class="elem"> 
                <!-- <button class:selectedState={selected[index]} class="lab">
                    {classList[index]}
                </button> -->
                <div class="circle">
                    <span class="dot" class:selectedDot={activeCircles1[0]} class:pathSelected={expanded[0] && (count)==1}></span>
                </div>
            </div>
            {#each nucsSm1 as name, index}
            <div class="elem"> 
                <!-- <button class:selectedState={selected[index]} class="lab">
                    {classList[index]}
                </button> -->
                <div class="circle">
                    <span class="dot" class:selectedDot={activeCircles1[index+1]} class:pathSelected={expanded[0] && (count-2)==index}></span>
                </div>
                <div class="lineH" class:selectedLine={activeCircles1[index+1]} class:pathSelectedLine={expanded[0] && (count-2)==index}>
                </div>
                <div class="lineX" class:selectedX={activeCircles1[index+1]} class:pathSelectedLine2={expanded[1] && (count-2)==index}>
                </div>
            </div>
            {/each}
        </div>

        <div id="row2"> 
            <div class="rowLab"> 
                highGC:
            </div>
            <div class="elem"> 
                <!-- <button class:selectedState={selected[index]} class="lab">
                    {classList[index]}
                </button> -->
                <div class="circle">
                    <span class="dot" class:selectedDot={activeCircles2[0]} class:pathSelected2={expanded[1] && (count)==1}></span>
                </div>
            </div>
            {#each nucsSm1 as name, index}
            <div class="elem"> 
                <!-- <button class:selectedState={selected[index]} class="lab">
                    {classList[index]}
                </button> -->
                <div class="lineX2" class:selectedX2={activeCircles2[index+1]}  class:pathSelectedLine={expanded[0] && (count-2)==index}>
                </div>
                <div class="circle">
                    <span class="dot" class:selectedDot={activeCircles2[index+1]} class:pathSelected2={expanded[1] && (count-2)==index}></span>
                </div>
                <div class="lineH" class:selectedLine={activeCircles2[index+1]} class:pathSelectedLine2={expanded[1] && (count-2)==index}>
                </div>
                
            </div>
            {/each}
        </div>


    </div>

    <div id="CalcSection">
        <p class="scrollLab"> <i class="arrow right" ></i> </p>
        <Increment bind:count={count} />
        <div class='wrapMath'>
            <div class="math">
                <Katex>{String.raw`P_{`}{count}{String.raw`}=  max\left\{
                \begin{array}{l}
                P_{`}{count}{String.raw`,l} \\
                P_{`}{count}{String.raw`,h}
                \end{array}
                \right.
                `}</Katex>
            
            <Collap2 headerText={'why?'}>
                <div class="content">
                    We start with the observation that the optimal sequence through a certain position <Katex>i</Katex> is either the optimal sequence 
                    through that position ending in a lowGC state, <Katex>{String.raw`P_{i,l}`}</Katex>, 
                    or the optimal sequence through that position ending in a highGC state, <Katex>{String.raw`P_{i,h}`}</Katex>.
                    This means that the probability of the optimal sequence is the maximum of those sequence probabilities.                </div>
            </Collap2>
        </div>
        </div>

        <div class='wrapMath' class:hideMath={count==1}>
            <div class="math" >
                <div class="mathinnerWrap" class:mathSelected={expanded[0]}> 
            <Katex >{String.raw`P_{`}{count}{String.raw`,l}=  max\left\{
                \begin{array}{l}
                P_{`}{count-1}{String.raw`,l}*P(l|l)*P(o_{`}{count}{String.raw`}|l) \\
                P_{`}{count-1}{String.raw`,h}*P(l|h)*P(o_{`}{count}{String.raw`}|l)
                \end{array}
                \right.
            `}
            </Katex>
        </div>
            
            <Collap2 headerText={'why?'} bind:expanded={expanded[0]}>
                <!-- count is 2 -->
                <div class="content" class:hideMath={count>2}>
                    There are two possible paths of length 2 that end in a lowGC region.
                    1) We start in a lowGC region (<Katex>{String.raw`P_{1,l}`}</Katex>) and stay in a lowGC region, 
                    or 2)
                    we start in a highGC region (<Katex>{String.raw`P_{1,h}`}</Katex>) and transition to a lowGC region.
                    <br>
                    <br>
                    The probability of each is the maximum probability of the previous path ending in the relevant state, 
                    times the transition probability, times the emission probability.
                </div>
                <!-- count is > 2 -->
                <div class="content" class:hideMath={count==2}>
                    There are two possible paths of length <Katex>i</Katex> that end in a lowGC region.
                    1) We stay in a lowGC region from a lowGC region, 
                    or 2)
                    we transition to a lowGC region from a highGC region.
                    <br>
                    <br>
                    The probability of each is the maximum probability of the previous path ending in the relevant state, 
                    times the transition probability, times the emission probability.
                </div>
            </Collap2>
        </div>
        </div>

        <div class='wrapMath' class:hideMath={count==1}>
            <div class="math">
                <div class="mathinnerWrap" class:mathSelected2={expanded[1]}> 
                <Katex>{String.raw`P_{`}{count}{String.raw`,h}=  max\left\{
                    \begin{array}{l}
                    P_{`}{count-1}{String.raw`,l}*P(h|l)*P(o_{`}{count}{String.raw`}|h) \\
                    P_{`}{count-1}{String.raw`,h}*P(h|h)*P(o_{`}{count}{String.raw`}|h)
                    \end{array}
                \right.
                `}</Katex>
                </div>
                
            <Collap2 headerText={'why?'} bind:expanded={expanded[1]}>
                <div class="content">
                    The optimal probability of a path of length <Katex>{count==2 ? 2 : "i"}</Katex> that ends in a highGC region is found in the same way.
                    <br>
                    <br>
                    The optimal path can either stay in a highGC region from a highGC region, 
                    or transition to a highGC region from a lowGC region.
                    <br>
                    <br>
                    The probability of each is the maximum probability of the previous path ending in the relevant state, 
                    times the transition probability, times the emission probability.
                </div>
            </Collap2>
        </div>
        </div>

        <div class='wrapMath' class:hideMath={count>1}>
          <div class="math">
            <div class="mathinnerWrap narrow" class:mathSelected={expanded[0]}> 
            <Katex>{String.raw`P_{1,l} =  P(s_1=l)*P(o_1|l)`}</Katex>
        </div>
          <Collap2 headerText={'why?'}  bind:expanded={expanded[0]}>
            <div class="content">
                The probability of the first state being lowGC is the probability of starting in a lowGC region, <Katex> {String.raw`P(s_1=l)`}</Katex>, 
                times the probability of emitting an 'A' in a lowGC region,  <Katex>{String.raw`P(o_1|l).`}</Katex>
            </div>
            
          </Collap2>
        </div>
        </div>

        <div class='wrapMath' class:hideMath={count>1}>
          <div class="math">
            <div class="mathinnerWrap narrow" class:mathSelected2={expanded[1]}> 
                <Katex>{String.raw`P_{1,h} =  P(s_1=h)*P(o_1|h)`}</Katex>
            </div>
          <Collap2 headerText={'why?'}  bind:expanded={expanded[1]}>
            <div class="content">
                The probability of the first state being highGC is the probability of starting in a highGC region, <Katex> {String.raw`P(s_1=h)`}</Katex>, 
                times the probability of emitting an 'A' in a highGC region,  <Katex>{String.raw`P(o_1|h)`}</Katex>.
            </div>
          </Collap2>
        </div>
        </div>
    </div>

</div>
    
<style>

    .hideMath {
        display: none;
    }

    .hideMath .math {
        display: none;
    }

    .wrapper {
        position: relative;
        border: 1px black solid;
        /* margin: 1em 0; */
        padding: 1em;
        background-color: white;
        max-width: 700px;
        margin: 0 auto;
        /* height: 200px; */
    }

    #CalcSection {
        margin: 0px 0;
        position: relative;
    }

    #CalcSection p {
        margin: 0;
    }

    .math {
        padding: 0px 0;
    }

    .wrapMath {
        display: block;
    }

    .mathinnerWrap {
        max-width: 400px;
        margin: 0 auto;
        border-radius: 10px;
        padding: 10px;
        border: 5px transparent solid;
    }

    .narrow {
        max-width: 300px;
    }

    .scrollLab {
        position: absolute;
        top: -40px;
        right: 5px;
    }

    .arrow {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
    }

    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    #row0 {
        
        grid-row: 1/2;
        /* margin: 1em 0;  */
        display: flex;
        /* height: 70px; */
        align-items: center;
    }

    #row1 {
        
        grid-row: 2/3;
        /* margin: 1em 0;  */
        display: flex;
        /* height: 70px; */
        align-items: center;
        padding-bottom: 20px;
    }

    #row2 {
        grid-row: 3/4;
        /* margin: 1em 0;  */
        display: flex;
        /* height: 70px; */
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px black solid;
    }

    .rowLab{
        width: 100px;
        text-align: right;
        /* padding-right: 55px; */
    }

    .lineH {
        position: absolute;
        top: 11px;
        right: 62px;
        border-bottom: 3px solid rgb(80, 80, 78);
        width: 76px;
        margin: auto;
    }

    .lineX {
        position: absolute;
        top: 18px;
        right: 20px;
        border-bottom: 3px solid rgb(80, 80, 78);
        width: 120px;
        transform: rotate(38deg);
        transform-origin: left;
    }

    .lineX2 {
        position: absolute;
        top: 4px;
        right: 37px;
        border-bottom: 3px solid rgb(80, 80, 78);
        width: 102px;
        transform: rotate(-38deg);
        transform-origin: left;
    }

    .elem {
        position: relative;
        width: 100px;
    }

    .dot {
        height: 25px;
        width: 25px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }

    .selectedDot {
        background-color: gray;
    }

    .pathSelected{
        background-color: #fc8916 !important;
    }

    .pathSelectedLine{
        border-bottom: 5px solid #fc8916 !important;
    }

    .mathSelected{
        border: 5px #fc8916 solid;
    }

    .mathSelected2{
        border: 5px #e3cd24 solid;
    }

    .pathSelected2{
        background-color: #e3cd24 !important;
    }

    .pathSelectedLine2{
        border-bottom: 5px solid #e3cd24 !important;
    }

    .selectedLine {
        top: 10px;
        border-bottom: 5px solid gray;
    }

    .selectedX {
        top: 17px;
        right: 21px;
        width: 120px;
        border-bottom: 5px solid gray;
    }

    .selectedX2 {
        top: 3px;
        right: 37px;
        width: 102px;
        border-bottom: 5px solid gray;
    }

    .scrollR {
        overflow-x: auto;
        display: grid;
        gap: 25px;
    }

</style>