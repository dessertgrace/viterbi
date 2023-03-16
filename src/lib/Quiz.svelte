<script>
	import { onMount } from 'svelte';
    import Katex from 'svelte-katex'
    import Collapsible from './Collapsible.svelte'

	let answer = 'D';
	let correct = 'correct!';
	let incorrect = 'try again!';
	let isRight = '';
    let correctB = false;
	
	function checkAnswer(evt) {		
		const choice = String(evt.target.value).toUpperCase();
		if (choice === answer.toUpperCase()) {
			isRight = correct;
            correctB = true;
		} else {
			isRight = incorrect;
            correctB = false;
		}
		// evt.target.value = 'select';
	}

</script>

<div class="wrap">

<select on:change={checkAnswer} class:isRight={correctB}>
	<option value="select" selected>Select</option>
	<option value="A">n
    </option>
	<option value="B">n^S
    </option>
	<option value="C">n*S
    </option> 
	<option value="D">
        S^n
    </option>
</select>

<div class="ans"> <strong>Result</strong>:  <span class="is-right">{isRight}</span>
</div>


<div class='collCont'> 
<Collapsible headerText={"I'm confused..."} >
    <div class="content">
      How many possible sequences of hidden states are there?
      <br>
      Each nucleotide could be in a highGC or lowGC region. That is two possible states at each event, so <Katex>{String.raw`S`}</Katex> is 2.
      <br>
      There are <Katex>{String.raw`n`}</Katex> nucleotides or observations total, and each could be from one of <Katex>{String.raw`S`}</Katex> hidden states. 
      <br>
      So, there are <Katex>{String.raw`S*S*S*S*... `}</Katex> possible sequences of states, one factor of <Katex>{String.raw`S`}</Katex> for each of <Katex>{String.raw`n`}</Katex> states, or <Katex>{String.raw`S^n`}</Katex>.
    </div>
  </Collapsible>
</div>

</div>


<style>
    .collCont{
        display: table;
        margin: 0.5em;
        padding-top: 0.5em;
        border-top: 1px black solid;
        width: 100%;
    }

    .wrap {
        display: flex;
        flex-wrap: wrap;
        /* gap: 0.5em; */
        margin: 10px auto;
        max-width: 400px;
        padding: 1.4em;
        background-color: white;
        border: 1px black solid;
        border-radius: 9px;
    }

    .ans {
        grid-row: 1/2;
        width: 140px;
        /* min-width: 125px; */
        max-width: 200px;
        text-align: left;
        margin: 10px auto;
        align-self: left;
    }


    .isRight {
        background-color: #19818f;
    }

	select {	
        grid-row: 1/2;
        margin: 10px auto;
        width: 200px;
        /* max-width: 80%; */
        /* margin: 1rem auto; */
		padding: 0.5rem 1rem;		
	}

	select {
		font-size: 14px;
		background-color: #1a0850;
		color: white;
		border-radius: 10px;
	}

</style>
