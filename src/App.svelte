<script>
    import svelteLogo from './assets/svelte.svg'
    import Counter from './lib/Counter.svelte'
    import DnaSelector from './lib/DNASelector.svelte';
    import HmMvalues from './lib/HMMvalues.svelte';
    import ProbCalc from './lib/ProbCalc.svelte';
    import Table from './lib/Table.svelte';

    import {hiddenStates} from './stores.js';

</script>

<main>

  <body>

    <h1>Viterbi Decoding</h1>

    <p style="text-align: center"> <em> Suppose you are a world-famous computational biologist. </em> </p>
    <p>You recently discovered a new species of <strong> Archaea</strong>, single-celled microorganisms that make up one of the main domains of life on earth. This Archaea was found living in an extreme environment of high pressure and high temperature near hydrothermal vents (underwater volcanoes!). Archaea are distinct from other domains of life because they lack of nuclei (and any interior membranes) and have unique protein composition.</p>

    <div class="imageWrap">
      <div style="max-height:400px"  class="innerimage">
        <img style="max-height:400px" src="./images/lokiCastle.jpeg" alt="loki's castle underwater hydrothermal vent structure">
      </div>
      <div style="max-height:400px"  class="innerimage">
        <img style="max-height:400px" src="./images/archaea.jpeg" alt="Archaea clip art with labelled parts">
      </div>
  </div>

    <p> Your friend was able to sequence large sequences of DNA, the genetic code of cellular function, from this archaea. 
      Now with the DNA you have to figure out all that you can about this new species.  
      How does it survive in such extreme temperatures? 
      What makes it different from other species of Archaea? 
      How is it evolutionarily related to other species and other domains of life?
    </p>

    <p style="text-align: center"> <em> Welcome to the Great Archaea Mystery. </em></p>

    <h2> Biology Background</h2>

    <div style="max-height:400px"  class="innerimage">
      <img style="max-height:400px" src="./images/DNA.jpeg" alt="Diagram of DNA, RNA, amino-acid sequence, and protein">
    </div>
    
    <p> Image caption: 
      DNA is a double-stranded chain of nucleotides that contains the genetic instructions for an organism. 
      There are four nucleotides found in DNA: adenine (A), tyenine (T), guanene (G), and cytosine (C). 
      We can study DNA as a sequence of these values, which makes up a code to direct all protein synthesis and functionality for the cell.
    </p>
    <p> Archaea have a single circular chromosome of DNA that can be anywhere from 0.5-7 million base pairs long, depending on the species. DNA is organized into small regions based on standard codes that perform different functions, such as initiating replication or coding for protein synthesis.</p>
    <p>
      The "Central Dogma" of biology describes the core understanding of information flow in cells. 
      DNA contains the base genetic instructions for all cellular functionality. 
      Some DNA is transcribed into RNA, which allows for increased control and regulation of many cellular processes including protein synthesis. 
      Some RNA, called messenger-RNA, is translated into protein. 
      Proteins make up the majority of structure and function of cells and are hugely diverse and highly-regulated for control and responsiveness of cellular processes.
      While we understand this the basic flow of information in cells, the details of regulation and control of transcription, translation, and protein functionality are hugely complex and the subject of much current cutting-edge research.
    </p>
    
    <h2> Identifying gene-coding regions </h2>
    <p> 
      Given our Archaeal DNA, we want to find protein-coding regions and classify them into categories to better understand their function. 
      By recognizing certain patterns of nucleotides that are associated with known protein functionality, we can start to understand this DNA. 
    </p>
    <p>
      Structural-protein encoding genes are known to have higher GC content than other genes in organisms that live at high temperatures and pressures. 
    </p>
    <p>
      The question is: given our DNA sequences, which stretches of nucleotides encode structural-proteins? 
    </p>

    <p> What sequence of hidden states do you think is most probable? Select each nucleotide that you think is in a high-GC region.</p>
    <div class="wrapDNA">
      <DnaSelector/>
    </div>
    <p> You might first select all G and C nucleotides. 
      But what makes this unlikely? 
      Protein-encoding regions are known to be relatively long (often > 100 nucleotides in length), so 
      the probability of transitioning between states after each nucleotide is low.
      Therefore, we expect large stretches of nucleotides in the same state even if there is a larger percentage of AT nucleotides in highGC regions.
    </p>

    <p> Depending on the probability of transitioning between states and the probability of seeing an A or T nucelotide in a high-GC region, the most likely sequence of states will differ.
      We call these the <strong> transition </strong> and <strong> emission probabilities</strong>. The tradeoffs between them represent the core statistical problem of this situation. 
    </p>

    <p> We can use a statistical model to help us quantify and solve the problem. </p>

    <h2> Hidden Markov Models</h2>
    <p> Hidden Markov Models (HMMs) are popular statistical tools used to model a sequence of observations attributable to sequential hidden states. HMMs are a type of statistical model, a mathematical tool to represent events or observations as random variables with defined relationships and assumptions. 
        In HMMs, the <strong> core assumption</strong> is that the probability of each state depends only on the previous state, and the probability of each event depends only on the current state.
    </p>

    <img src="./images/hmm.png" alt="diagram of HMM with three states and three observations">

    <p>  We can depict HMMs with graph images, where the top row represents the sequence of hidden states (x_i), and the bottom row represents the observations (y_i) generated from those states. 
      Notice that the arrows represent dependence of one state/event on another.</p>

    <p> Applying HMMs to our problem, the status of low- or high-GC region at every nucleotide are the hidden states, and the nucleotides observed are the resulting observations from each state.</p>
    <p> The transition and emission probabilities for low- and high-GC regions in Archaea are the following:</p>

    <Table/>

    <p> The total probability of a sequence of hidden states will be the cumulative probability of each state transition and each observed emission. We can represent this probability with the following equation:</p>

    <p> where __ is the ___ of __, and __ is the ___ of __. </p>

    <p> Using this equation, calculate the probability of your selected sequence of hidden states given the following transition and emission probabilities.</p>

    <ProbCalc hiddenStates={hiddenStates}/>



    <!-- <p> There are many other applications of HMMs for probem solving. 
      Given a sequence of observations and known hidden states, we could build HMMs for specific cases. 
      Given a built model with emission and transition probabilities, we could generate "realistic" sequences. 
      Given a built model and a relevant DNA sequence, we could decode the likely hidden states across the sequence.

      For our purposes, the decoding problem is most relevant. Given our Archaeal DNA, we want to find genes and classify them into categories to better understand their function.
    </p> -->


    <h2> The Viterbi Algorithm </h2>
    <p> The Viterbi Algorithm is used to determine the most likely sequence of hidden states generated by a sequence of observations. 
      By taking advantage of the optimal substructure of the path optimization problem, 
      this algorithm can compute the best path very efficiently compared to the brute-force method. </p>

    <div class="card">
      <Counter />
    </div>

  </body>

  <footer>
    <p> <strong> by Grace Dessert </strong> </p>
    <p> <strong> March 2023 </strong> </p>
    <br>
    <h3> Thanks for engaging with this interactive lesson!</h3>
    <h3> Thank you to my sister Juju for help with biology and inspiration to study Archaea.</h3>
    <h3> This lesson is based on the following Nature publication: </h3>
    <h3> References:</h3>
    <ul>
      <li> <a href="https://avikdas.com/assets/images/2019-06-24-dynamic-programming-for-machine-learning-hidden-markov-models/hmm-bare.png"> HMM Image </a></li>
      <li> <a href="https://www.cis.upenn.edu/~cis2620/notes/Example-Viteri-DNA.pdf"> UPenn Viterbi Example</a> </li>
    <li> <a href="https://images.allthescience.org/slideshow-mobile-small/archaebacteria-diagram.jpg"> Archaea Image </li>
      <li> <a href="https://media.npr.org/assets/img/2015/05/05/lokis-castle_custom-7e6ab7912fe71c61c115ccc29515ec924140f561.jpg"> Loki's Castle Image </li>
    <li> <a href="https://astrobiochem.files.wordpress.com/2019/02/sample-essay-on-regulation-of-gene-expression.jpg?w=810"> DNA image </li>
 
    </ul>
  </footer>

</main>

<style>

  .innerimage {
    border: 10px white solid;
    background-color: white;
    border-radius: 5px;
  }


  .imageWrap {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    /* flex-direction: column; */
  }

  img {
    width:100%;
  }

.wrapDNA {
  padding:0;
}

h2 {
  text-align: start;
}

p {
  text-align: start;
}
footer {
  text-align: start;
}

:global(body) {
		background-color: rgb(210, 228, 229);
		color: #1a0850;
    width: 100%;
    height: 100%;
    min-width: 200px;
    font-size: 18px;
    display: block;
    box-sizing: border-box;
	}

main {
  max-width: 1100px;
  margin: 0 auto;
  background-color: rgb(210, 228, 229);
  color: #1a0850;
}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 600px) {
  body {
    font-size: 16px;
  }
}




</style>
