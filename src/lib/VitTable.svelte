<script>
    import Katex from 'svelte-katex';
    import Collap2 from './Collap2.svelte';
    import Increment from './Increment.svelte';
    import Increment2 from './Increment2.svelte';

    let DNA = "ATTCTACGACGCGCCGCCCACGTCAAGCTATTCAA";
    let nucsS = DNA.split("");

    let DPTable = [[],[]];
    let DPTableShow = [[],[]];
    nucsS.forEach( function (nucS, index) {
        DPTableShow[0].push(true);
        DPTableShow[1].push(true);
    })

    let nucOptions = ['A','T','G','C']
    let transitions = [[0.8,0.2],[0.8,0.2]]; // (low->low, low->high), (high->high, high->low)
    let highGCEms = [0.1,0.1,0.4,0.4]; // A, T, G, C
    let lowGCEms = [0.3,0.3,0.2,0.2]; // A, T, G, C

    // store backpointers!
    let backPointers = [[],[]];
    nucsS.forEach( function (nucS, index) {
        backPointers[0].push(0);
        backPointers[1].push(0);
    })

    // fill DP table 
    // initiate
    DPTable[0][0] = 0.5 * lowGCEms[nucOptions.indexOf(nucsS[0])];
    DPTable[1][0] = 0.5 * highGCEms[nucOptions.indexOf(nucsS[0])];
    let options = [0,0];
    for (let i=1; i<nucsS.length;i++){
        // max prob through i ending in L
        // STAY (low -> low)
        options[0] = DPTable[0][i-1] * lowGCEms[nucOptions.indexOf(nucsS[i])] * transitions[0][0];
        // SWITCH (high -> low)
        options[1] = DPTable[1][i-1] * lowGCEms[nucOptions.indexOf(nucsS[i])] * transitions[1][1];
        DPTable[0][i] = Math.max(options[0],options[1]);
        backPointers[0][i] = options.indexOf(DPTable[0][i]); // point to Low = 0, point to high = 1

        // max prob through i ending in H   
        // STAY (high -> high)
        options[1] = DPTable[1][i-1] * highGCEms[nucOptions.indexOf(nucsS[i])] * transitions[1][0];
        // SWITCH (low -> high)
        options[0] = DPTable[0][i-1] * highGCEms[nucOptions.indexOf(nucsS[i])] * transitions[0][1];
        DPTable[1][i] = Math.max(options[0],options[1]);
        backPointers[1][i] = options.indexOf(DPTable[1][i]); // point to Low = 0, point to high = 1
    }

    console.log("here are the backpointers")
    console.log(backPointers[0])
    console.log(backPointers[1])

    // do backprop
    let truthSel = []; // false=lowGC, true=highGC
    nucsS.forEach( function (nucS, index) {
        truthSel.push(false);
    })
    options = [DPTable[0][nucsS.length-1], DPTable[1][nucsS.length-1]];
    let maxProb = Math.max(options[0], options[1]);
    console.log("we end in state:")
    console.log(options.indexOf(maxProb));
    truthSel[nucsS.length-1] = options.indexOf(maxProb); // 0 is low, 1 is high
    // follow pointers
    for (let i=nucsS.length-2; i>=0;i--){
        let stateNext = truthSel[i+1]; // state of index before (going backwards) as 0 or 1
        truthSel[i] = backPointers[stateNext][i+1];
    }
    console.log("here is true seq")
    console.log(truthSel)

    let started = false;
    let fillAll = false;

    let count = 1;
    let expanded = [false, false];

    let selected=[];
    nucsS.forEach( function (nucS, index) {
        selected.push(false);
    })
    let lowGCP=[];
    nucsS.forEach( function (nucS, index) {
        lowGCP.push(0);
    })
    let highGCP=[];
    nucsS.forEach( function (nucS, index) {
        highGCP.push(0);
    })

    const select = (id) => {
        selected[id] = !selected[id];
    }

    function fillTable() {

    }

    $: fillTable()

</script>

<div class="wrapper">

    <div class="scrollR">
  <table>
      
      <tr>
        <th></th>
        {#each nucsS as name, index}
            <td>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class:selected={selected[index]} on:click={() => {select(index)}} class="selected nuc">
                <strong> {name} </strong>
            </div>
            </td>
        {/each}
      </tr>
      <tr>
          <th>low-GC</th>
          {#each nucsS as name, index}
                <td class:cellShow={(DPTableShow[0][index] && count >= (index+1) && started) || fillAll}  >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class:selectedProb={(selected[index]  && count >= (index+1)) || fillAll} on:click={() => {select(index)}} class="prob">
                    <!-- {lowGCP[index]} -->
                    <div class:hideVal={(DPTableShow[0][index]  && count >= (index+1)  && started) || fillAll} ><Katex>{String.raw`P_{`}{index+1},lowGC{String.raw`}`}</Katex></div>
                    <div class:hideVal={(!DPTableShow[0][index]  || count < (index+1)  || !started) && !fillAll}><Katex>{DPTable[0][index].toExponential(1)}</Katex></div>
                </div>
                <div class="straightArrow" class:hideVal={! ((backPointers[0][index]==0 && (count > (index)  && started && index>=1)) || (fillAll && index>=1 && backPointers[0][index]==0))}>
                <svg viewBox="0 0 40 40">
                    <defs>
                      <marker id="arrowhead" markerWidth="7" markerHeight="7" 
                      refX="3.5" refY="0">
                        <polygon points="7 0, 3.5 5, 0 0" fill="black"/>
                      </marker>
                    </defs>
                    <line x1="20" y1="1" x2="20" y2="10" stroke="black" 
                    stroke-width="0.7" marker-end="url(#arrowhead)" />
                  </svg>
                </div>
                <div class="diagArrow" class:hideVal={! ((backPointers[0][index]==1 && (count > (index)  && started && index>=1)) || (fillAll && index>=1 && backPointers[0][index]==1))}>
                    <svg viewBox="0 0 40 40">
                        <defs>
                          <marker id="arrowhead" markerWidth="7" markerHeight="7" 
                          refX="3.5" refY="0">
                            <polygon points="7 0, 3.5 5, 0 0" fill="black"/>
                          </marker>
                        </defs>
                        <line x1="20" y1="1" x2="20" y2="10" stroke="black" 
                        stroke-width="0.7" marker-end="url(#arrowhead)" />
                      </svg>
                    </div>
                </td>
                
            {/each}
          
      </tr>
      <tr>
          <th>high-GC</th>
          {#each nucsS as name, index}
                <td  class:cellShow={(DPTableShow[1][index] && count >= (index+1) && started) || fillAll} >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class:selectedProb={(selected[index]  && count >= (index+1)) || fillAll} on:click={() => {select(index)}} class="prob">
                    <!-- {highGCP[index]} -->
                    <div class:hideVal={(DPTableShow[1][index]  && count >= (index+1) && started) || fillAll} ><Katex>{String.raw`P_{`}{index+1},highGC{String.raw`}`}</Katex></div>
                    <div class:hideVal={(!DPTableShow[1][index]  || count < (index+1) || !started) && !fillAll}><Katex>{DPTable[1][index].toExponential(1)}</Katex></div>
                </div>
                <div class="straightArrow" class:hideVal={! ((backPointers[1][index]==1 && (count > (index)  && started && index>=1)) || (fillAll && index>=1 && backPointers[1][index]==1))}>
                <svg viewBox="0 0 40 40">
                    <defs>
                        <marker id="arrowhead" markerWidth="7" markerHeight="7" 
                        refX="3.5" refY="0">
                        <polygon points="7 0, 3.5 5, 0 0" fill="black"/>
                        </marker>
                    </defs>
                    <line x1="20" y1="1" x2="20" y2="10" stroke="black" 
                    stroke-width="0.7" marker-end="url(#arrowhead)" />
                    </svg>
                </div>
                <div class="diagUpArrow" class:hideVal={! ((backPointers[1][index]==0 && (count > (index)  && started && index>=1)) || (fillAll && index>=1 && backPointers[1][index]==0))}>
                    <svg viewBox="0 0 40 40">
                        <defs>
                            <marker id="arrowhead" markerWidth="7" markerHeight="7" 
                            refX="3.5" refY="0">
                            <polygon points="7 0, 3.5 5, 0 0" fill="black"/>
                            </marker>
                        </defs>
                        <line x1="20" y1="1" x2="20" y2="10" stroke="black" 
                        stroke-width="0.7" marker-end="url(#arrowhead)" />
                        </svg>
                    </div>
                </td>
            {/each}
      </tr>
     
      </table>
    
</div>

<div id="CalcSection">


    <p class="scrollLab"> <i class="arrow right" ></i> </p>

    <Increment2 bind:count={count} bind:started={started} bind:fillAll={fillAll}/>
    <div class='wrapMath'>
        
        <div class="math">
            <Katex>{String.raw`P_{`}{count}{String.raw`}=  max\left\{
            \begin{array}{l}
            P_{`}{count}{String.raw`,l} \\
            P_{`}{count}{String.raw`,h}
            \end{array}
            \right.
            `}</Katex>
    </div>

    </div>

    <div class='wrapMath' class:hideMath={count<=1}>
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
        
    </div>
    </div>

    <div class='wrapMath' class:hideMath={count<=1}>
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
    </div>

    </div>

    <div class='wrapMath' class:hideMath={count>1}>
      <div class="math">
        <div class="mathinnerWrap narrow" class:mathSelected={expanded[0]}> 
        <Katex>{String.raw`P_{1,l} =  P(s_1=l)*P(o_1|l)`}</Katex>
    </div>
      
    </div>
    </div>

    <div class='wrapMath' class:hideMath={count>1}>
      <div class="math">
        <div class="mathinnerWrap narrow" class:mathSelected2={expanded[1]}> 
            <Katex>{String.raw`P_{1,h} =  P(s_1=h)*P(o_1|h)`}</Katex>
        </div>
      
    </div>
    </div>
</div>


</div>


<style>

    svg {
        stroke: white !important;
        fill: white !important;
    }
    svg polygon {
        stroke: white !important;
        fill: white !important;
    }

    .wrapStart {
        width: 50px;
        margin: 0 auto;
    }
    button {
        background-color: rgb(238, 238, 238);
    }
    .hideVal {
        display:none;
    }

    .hideVal svg{
        display: none;
        width:0px;
    }

    .nuc {
        cursor: default;
    }

    #CalcSection {
        margin: 0px 0;
        position: relative;
    }

    #CalcSection p {
        margin: 0;
    }

    .prob {
        width: 90px;
    }

    .hideMath {
        display: none;
    }

    .hideMath .math {
        display: none;
    }

    .math {
        padding: 0px 0;
    }

    .wrapMath {
        display: block;
        margin: 1.5em auto;
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

  .wrapper{
    position: relative;
    border: 1px black solid;
    padding: 2em;
    background-color: white;
  }

  .titleRow {
      border: 1x black solid;
      border-collapse: collapse;
      padding: 1.5ch;
      text-align: start !important;
      margin: 0 auto;
      margin: 10px;
      
  }

  table, th, tr, td {
      border: 1px rgb(120, 120, 120) solid;
      border-collapse: collapse;
      padding: 1ch;
      align-items: center;
      font-size: 17px;
  }

  .cellShow {
    background-color: #c9c4d8;
  }

  table {
    grid-row: 1/2;
    width: 1900px;
    background-color: rgb(235, 235, 235);
    /* color: white; */
    /* border: 2px black solid; */
    margin: auto auto;
    /* margin-top: 20px; */
    /* max-width: 100%; */
    /* max-width: 100px; */
    border-bottom: 1.5px rgb(120, 120, 120) solid;
    margin-bottom: 1em;
  }

  tr, td {
    position: relative;
  }

  .straightArrow {
    position: absolute;
    top: 15px;
    left: -42px;
    width: 60%;
    height: 60%;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }

  .diagArrow {
    position: absolute;
    top: 50px;
    left: -36px;
    width: 60%;
    height: 60%;
    transform: rotate(40deg);
    -webkit-transform: rotate(40deg);
  }

  .diagUpArrow {
    position: absolute;
    top: -19px;
    left: -36px;
    width: 60%;
    height: 60%;
    transform: rotate(130deg);
    -webkit-transform: rotate(130deg);
  }

  .scrollR {
        overflow-x: auto;
        display: grid;
        gap: 5px;
    }

    .scrollLab {
        position: absolute;
        top: -1em;
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

    .scrollR {
        overflow-x: auto;
        display: grid;
        gap: 25px;
    }
    .rowLab{
        width: 100px;
        text-align: right;
        /* padding-right: 55px; */
    }

  @media screen and (max-width: 600px) {
    table, th, tr, td {
    font-size: 14px;
  }
}



  </style>