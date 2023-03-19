<script>
	import { onMount } from 'svelte';
    import Katex from 'svelte-katex'
    import Collapsible from './Collapsible.svelte'

	let answer = 'C';
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

    <p> <strong> How is it possible that these DNA sequences match so perfectly?! </strong></p>

    <p>
        A: This DNA sequence was artificially inserted into this Archaeal DNA. Someone is messing with us!
    </p>
    <p>
        B: This isn't actually Archaeal DNA. Something got mixed up...
    </p>
    <p>
        C: This Archaea is somehow related to Eukaryotes.
    </p>
    <p>
        D: This Actin sequence evolved separately in Archaea and Eukaryoes. 
    </p>

<select on:change={checkAnswer} class:isRight={correctB}>
	<option value="select" selected>Select</option>
	<option value="A">A
    </option>
	<option value="B">B
    </option>
	<option value="C">C
    </option> 
	<option value="D">D
    </option>
</select>

<div class="ans"> <strong>Result</strong>:  <span class="is-right">{isRight}</span>
</div>


<div class='collCont'> 
<Collapsible headerText={"Explanation"} >
    <div class="content">
        While all of these are possibilities, researchers following similar methods and a robust scientific process narrowed it down to option C: This Archaea is somehow related to Eukaryotes.
    </div>
  </Collapsible>
</div>

</div>


<style>
    p {
        margin: 0.5em;
        text-align: left;
    }
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
        max-width: 700px;
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
