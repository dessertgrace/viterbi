<script>
    let DNA = "ATTCCGCGTATCCGGGGTTATGCGCCTTCCCCC";

    import {hiddenStates} from '../stores.js';

    let selected=[];
    let nucsS = DNA.split("");
    nucsS.forEach( function (nucS, index) {
        selected.push(false);
    })

    let classList=[];
    nucsS.forEach(function () {
        classList.push("");
    })

    function updateContRegions() {
        console.log('ok')
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

    </div>

    <div id="row3">
        <p> scroll <i class="arrow right" ></i> </p>
    </div>

    </div>
    

  <style>
    .rowLab {
        width: 120px;
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
        grid-row: 1/2;
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
        width: 70px;  
        color: black;
    }

    .nuc {
        height: 50px;
        width: 70px;
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
        grid-row: 2/3;
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
    }

    @media screen and (max-width: 600px) {
    .nuc, .lab {
        font-size: 14px;
    }
    .bWrap .lab {
        font-size: 8px !important;
    }
    .nuc, .lab {
        width: 40px;
    }
    .selectedState {
        height: 40px;
    }
    #statelabels {
        height: 40px;
    }
    .rowLab {
        width: 100px;
    }
}

  </style>
  