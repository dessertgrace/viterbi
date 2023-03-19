<script>
    import Katex from 'svelte-katex'

    let DNA = "ATTCTACGACGCGCCGCCCACGTCAAGCTATTCAA";
    
    export let hiddenStates;

    
    let selected=[];
    let nucsS = DNA.split("");
    nucsS.forEach(function (nucS, index) {
        selected.push(false);
    })

    function updateContRegions() {
        // console.log('ok')
    }

    let classList=[];
    nucsS.forEach(function () {
        classList.push("");
    })

    let transPs=[];
    nucsS.forEach(function () {
        transPs.push(0.8);
    })

    let emsPs=[];
    nucsS.forEach(function () {
        emsPs.push(0.25);
    })
    let totalProb;
    emsPs = updateEmsPs(selected);
    totalProb = updateTP(transPs, emsPs);

    function updateTransPs(selected){
        selected.forEach(function (nucS, index) {
            if (index==0){
                transPs[index]=0.5;
            } else {
                // if highGC
                if (selected[index]) {
                    if (selected[index]==selected[index-1]) {
                        transPs[index]=0.8;
                    } else {
                        transPs[index]=0.2;
                    }
                } else {
                    // if lowGC
                    if (selected[index]==selected[index-1]) {
                        transPs[index]=0.8;
                    } else {
                        transPs[index]=0.2;
                    }
                }
            }
        })
        return transPs;
    }

    function updateEmsPs(selected) {
        let highGCEms = [0.1,0.1,0.4,0.4]; // A, T, G, C
        let lowGCEms = [0.3,0.3,0.2,0.2]; // A, T, G, C
        let out = ["A",'T','G','C'];
        selected.forEach(function (nucS, index) {
            let thisNuc = nucsS[index];
            // if highGC
            if (selected[index]) {
                emsPs[index] = highGCEms[out.indexOf(thisNuc)]
            } else {
                // if lowGC
                emsPs[index] = lowGCEms[out.indexOf(thisNuc)]
            }
        });
        return emsPs;
    }

    function updateTP(transPs, emsPs) {
        totalProb = 1;
        transPs.forEach(function (p, index) {
            totalProb *= p;
            totalProb *= emsPs[index];
        });
        return totalProb;
    }

    $: { 
    if ($hiddenStates.length>0) {
        $hiddenStates.forEach(function (nucS, index) {
            selected[index] = nucS;
            if (nucS) {
                classList[index] = "highGC";
            } else {
                classList[index] = "";
            }
        });
        transPs = updateTransPs(selected);
        emsPs = updateEmsPs(selected);
        totalProb = updateTP(transPs, emsPs);
    }
    updateContRegions()
    }

    const select = (id) => {
        selected[id] = !selected[id];
        if (classList[id]== "") {
            classList[id] = "highGC";
        } else {
            classList[id] = "";
        }
        hiddenStates.update(contents => selected)
        updateContRegions()
    }

  </script>
  
  <div class="wrapper"> 

    <div class="scrollR">
        
        <div class="transitions offsetRow">
            <div class="bWrap,"> 
                <div class="bWrap, rowLab"> 
                    <Katex>{String.raw`P(s_i | s_{i-1}):`}</Katex>
                </div>
                </div>
                {#each nucsS as name, index}
                <div class="bWrap"> 
                    <button class:selectedTrans={selected[index]} class="clean offPos">
                        {transPs[index]}
                        <svg width="40px" height="40px" viewBox="0 0 80 40" class="transArrow">
                            <path stroke="#000" stroke-width="3" fill="none"
                                d="M9 38 A 18 20 0 0 1 64 40
                                    M68 35 63 41 57 35 68 35Z"/>
                        </svg>
                    </button>
                    
                </div>
                {/each}
        </div>

        <div id="statelabels"> 
            <div class="bWrap, rowLab"> 
            <div class="bWrap, rowLab"> 
                DNA region:
            </div>
            </div>
            {#each nucsS as name, index}
            <div class="bWrap"> 
                <button class:selectedState={selected[index]} class="lab">
                    {classList[index]}
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
                <button class:selected={selected[index]} on:click={() => {select(index)}} class="nuc">
                    {name}
                </button>
            </div>
            {/each}

        </div>


        <div class="emissions lastRow">
            <div class="bWrap, rowLab"> 
                <div class="bWrap, rowLab"> 
                    <Katex>{String.raw`P(o_i | s_{i}):`}</Katex>
                </div>
                </div>
                {#each nucsS as name, index}
                <div class="bWrap"> 
                    <button class="clean">
                        {emsPs[index]}
                        <svg viewBox="0 0 40 40" class="emArrow">
                            <defs>
                              <marker id="arrowhead" markerWidth="7" markerHeight="7" 
                              refX="3.5" refY="0">
                                <polygon points="7 0, 3.5 5, 0 0" />
                              </marker>
                            </defs>
                            <line x1="20" y1="1" x2="20" y2="10" stroke="#000" 
                            stroke-width="0.7" marker-end="url(#arrowhead)" />
                          </svg>
                    </button>
                </div>
                {/each}
        </div>

    </div>


    <div id="row3">
        <div class="totalMath"> 
            <Katex>{String.raw`P_{total}=`}{totalProb.toExponential(2)}</Katex>
        </div>
        <p> scroll <i class="arrow right" ></i> </p>
    </div>

    </div>

  <style>

    .emArrow {
        position: absolute;
        top: -32px;
        left: 0px;
    }

    .transArrow {
        position: absolute;
        transform: rotate(90);
        top: 18px;
        left: 15px;
    }

    .totalMath{
        text-align: left;
    }

    .rowLab {
        width: 130px;
        text-align: right;
        padding-right: 40px;
    }

    .offPos {
        position: relative;
        left: -35px;
    }

    p {
        margin: 0;
    }

    #row3 {
        position: relative;
        grid-row: 4/5;
        padding: 20px;
        /* height: 10px; */
    }

    #row3 p {
        position: absolute;
        top: 5px;
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

    .transitions {
        position: relative;
        margin-bottom: 8px;
        grid-row: 1/2;
        /* margin: 1em 0;  */
        display: flex;
        height: 70px;
        align-items: center;
    }

    /* .offsetRow {
        position: relative;
        grid-row: 3/4;
        left: -20px;
    } */

    .emissions {
        grid-row: 4/5;
        /* margin: 1em 0;  */
        padding-top: 10px;
        display: flex;
        height: 70px;
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
        grid-row: 2/3;
        background-color: rgb(212, 212, 212);
        height: 10px;
        padding: 0em 0.5em;
        border: 1px solid transparent;
        border-bottom: 2px solid black;
        border-top: 2px solid black;
        border-radius: 0px;
        cursor: default;
        outline: none;   
        width: 70px;  
        color: black;
    }

    .clean{
        position: relative;
        background-color: white;
        height: 10px;
        padding: 0em 0.5em;
        border: 1px solid transparent;
        /* border: 1px solid transparent; */
        /* border-bottom: 2px solid black; */
        /* border-top: 2px solid black; */
        border-radius: 0px;
        cursor: default;
        outline: none;   
        width: 70px;  
        color: black;
    }

    .nuc {
        height: 50px;
        width: 70px;
        background-color: rgb(240, 240, 240);
        padding: 0.6em 0.5em;
        grid-row: 3/4;
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
        gap: 5px;
        border-bottom: 1px gray solid;
    }

    .wrapperNuc {
        grid-row: 3/4;
        /* margin: 1em 0;  */
        display: flex;
        /* height: 70px; */
        align-items: center;
        
    }

    .lastRow {
        padding-bottom: 20px;
    }

    .selected {
        background-color: rgb(241, 204, 171);
    }

    .selectedState {
        background-color: rgb(241, 204, 171);
        height: 70px;
    }

    .selectedTrans{

    }

    @media screen and (max-width: 600px) {
    .nuc, .lab, .clean {
        font-size: 14px;
    }
    .bWrap .lab, .clean {
        font-size: 8px !important;
    }
    .nuc, .lab, .clean {
        width: 40px;
    }
    /* .selectedState, .selectedTrans {
        height: 40px;
    } */
    #statelabels {
        height: 40px;
    }
    .rowLab {
        width: 100px;
    }
    .offPos {
        left: -20px;
    }
    .transArrow {
        top: 4px;
        left: 2px;
    }
}

  </style>
  