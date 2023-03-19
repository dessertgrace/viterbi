<script>
    import Katex from 'svelte-katex';
    import Collap2 from './Collap2.svelte';
    import Increment from './Increment.svelte';
    import Increment2 from './Increment2.svelte';
    
    let DNA = "ATTCTACGACGCGCCGCCCACGTCAAGCTATTCAA";

    import {hiddenStates} from '../stores.js';

    let selected=[];
    let nucsS = DNA.split("");
    nucsS.forEach( function (nucS, index) {
        selected.push(false);
    })

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

    let classList=[];
    nucsS.forEach(function () {
        classList.push("");
    })

    let classListTruth=[];


    function updateContRegions() {
        console.log('ok')
    }
    nucsS.forEach(function (nuc, i) {
        if (truthSel[i]==1) {
            classListTruth.push("highGC");
        } else {
            classListTruth.push("");
        }
    })

    const select = (id) => {
        if (!revAll) {
            selected[id] = !selected[id];
            if (classList[id]== "") {
                classList[id] = "highGC";
            } else {
                classList[id] = "";
            }
            hiddenStates.update(contents => selected)
            updateContRegions()
        }
    }

    let revAll = false;
    function revealAll() {
        revAll = true;
    }

  </script>
  

  <div class="wrapper"> 

    <div class="scrollR">

        <table>
            
                <tr>
                  <th></th>
                  {#each nucsS as name, index}
                      <td class:selected={(selected[index] && !revAll) || (revAll && truthSel[index])}>
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <div class:selected={(selected[index] && !revAll) || (revAll && truthSel[index])} on:click={() => {select(index)}}>
                          <strong> {name} </strong>
                      </div>
                      
                      </td>
                  {/each}
                </tr>
                <tr>
                    <th class="tableRowLab"><p class="tableRowLab">low-GC</p></th>
                    {#each nucsS as name, index}
                          <td class="cellShow">
                          <!-- svelte-ignore a11y-click-events-have-key-events -->
                          <div on:click={() => {select(index)}} class="prob selectedProb">
                              <!-- {lowGCP[index]} -->
                              <div><Katex>{DPTable[0][index].toExponential(1)}</Katex></div>
                          </div>
                          <div class="straightArrow" class:hideVal={! ((backPointers[0][index]==0 && index>=1))}>
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
                            <div class="diagArrow" class:hideVal={! ((backPointers[0][index]==1 && index>=1))}>
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
                    <th class="tableRowLab"><p class="tableRowLab">high-GC</p></th>
                    {#each nucsS as name, index}
                          <td class="cellShow">
                          <!-- svelte-ignore a11y-click-events-have-key-events -->
                          <div class="prob selectedProb">
                              <!-- {highGCP[index]} -->
                              <div><Katex>{DPTable[1][index].toExponential(1)}</Katex></div>
                          </div>
                          <div class="straightArrow" class:hideVal={! ((backPointers[1][index]==1 && index>=1))}>
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
                            <div class="diagUpArrow" class:hideVal={! ((backPointers[1][index]==0 && index>=1))}>
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

        <div id="statelabels"> 
            <div class="bWrap, rowLab"> 
            <div class="bWrap, rowLab"> 
                DNA region:
            </div>
            </div>
            {#each nucsS as name, index}
            <div class="bWrap"> 
                <button disabled={revAll} class:selectedState={(selected[index] && !revAll) || (revAll && truthSel[index])} class="lab">
                    <p class:hideVal={!((selected[index] && !revAll) || (revAll && truthSel[index]))}> {classList[index]} </p>
                    <p class:hideVal={!revAll}> {classListTruth[index]} </p>
                </button>
            </div>
            {/each}
        </div>

        <div class="wrapperNuc">
            <div class="bWrap, rowLab"> 
                <div class="bWrap, rowLab"> 
                    Nucleotide:
                </div>
                </div>
            {#each nucsS as name, index}
            <div class="bWrap"> 
                <button disabled={revAll} class:selected={(selected[index] && !revAll) || (revAll && truthSel[index])} on:click={() => {select(index)}} class="nuc">
                    {name}
                </button>
            </div>
            {/each}

        </div>

    </div>

    <div id="row3">
        <p> scroll <i class="arrow right" ></i> </p>
    </div>

    <div class="wrapReveal">
        <button on:click={revealAll}> Reveal All</button>
    </div>

    </div>
    

  <style>
    

  .prob {
        width: 120px;
    }

    .tableRowLab{
        width: 120px;
    }

    .cellShow {
    background-color: #c9c4d8;
  }

  .tableWrap {
    grid-row: 1/2;
    display: flex;
  }

  table {
    
    width: 1900px;
    background-color: rgb(235, 235, 235);
    /* color: white; */
    /* border: 2px black solid; */
    margin: auto 0;
    /* margin-top: 20px; */
    /* max-width: 100%; */
    /* max-width: 100px; */
    border-bottom: 1.5px rgb(120, 120, 120) solid;
    margin-bottom: 1em;
    
  }

  table, th, tr, td {
      border: 1px rgb(120, 120, 120) solid;
      border-collapse: collapse;
      /* padding: 0.5em; */
      align-items: center;
      font-size: 17px;
      padding: 2ch 0;
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


  

    .rowLab {
        width: 120px;
    }

    .tableHead {
        width: 30px;
    }

    p {
        margin: 0;
    }

    #row3 {
        grid-row: 3/4;
        height: 10px;
    }

    #row3 p {
        position: absolute;
        bottom: 10px;
        right: 10px;
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

    #statelabels {
        /* margin: 1em 0; */
        grid-row: 2/3;
        display: flex;
        height: 70px;
        /* margin-bottom: 20px; */
        align-items: center;
    }

    .wrapper {
        position: relative;
        border: 1px black solid;
        /* margin: 1em 0; */
        padding: 1em;
        background-color: white;
        /* height: 200px; */
    }

    .lab {
        grid-row: 1/2;
        background-color: rgb(212, 212, 212);
        height: 10px;
        padding: 0em 0.5em;
        border: 1px solid transparent;
        border-bottom: 2px solid black;
        border-top: 2px solid black;
        border-radius: 0px;
        cursor: default;
        outline: none;   
        width: 120.63px;  
        color: black;
    }

    .hideVal {
        display:none;
    }

    .hideVal svg{
        display: none;
        width:0px;
    }

    .nuc {
        height: 50px;
        width: 120.63px;
        background-color: rgb(240, 240, 240);
        padding: 0.6em 0.5em;
        grid-row: 2/3;
        border-radius: 5px;
        display: block;
        color: black;
    }

    .bWrap {
        width: 100%;
        align-items: center;
        display: flex;
    }

    .bWrap .lab {
        font-size: 14px;
    }

    button {
        /* border: none; */
        /* border-radius: 5px; */
        transition: none;
    }

    .scrollR {
        overflow-x: auto;
        display: grid;
        gap: 25px;
    }

    .wrapperNuc {
        grid-row: 3/4;
        /* margin: 1em 0;  */
        display: flex;
        /* height: 70px; */
        align-items: center;
        padding-bottom: 20px;
    }

    .selected {
        background-color: rgb(241, 204, 171);
    }

    .selectedState {
        background-color: rgb(241, 204, 171);
        height: 70px;
        content-visibility: none;
    }

    @media screen and (max-width: 600px) {
    .nuc, .lab {
        font-size: 14px;
    }
    /* .bWrap .lab {
        font-size: 8px !important;
    } */
    /* .nuc, .lab {
        width: 40px;
    } */
    .selectedState {
        height: 40px;
    }
    #statelabels {
        height: 40px;
    }
    /* .rowLab {
        width: 100px;
    } */
}

  </style>
  