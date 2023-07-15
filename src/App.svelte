<script>
    import svelteLogo from './assets/svelte.svg'
    import Counter from './lib/Counter.svelte'
    import DnaSelector from './lib/DNASelector.svelte';
    import HmMvalues from './lib/HMMvalues.svelte';
    import ProbCalc from './lib/ProbCalc.svelte';
    import Table from './lib/Table.svelte';
    import Collapsible from './lib/Collapsible.svelte'

    import {hiddenStates} from './stores.js';
    
    import Katex from 'svelte-katex'
    import Quiz from './lib/Quiz.svelte';
    import VitTable from './lib/VitTable.svelte';
    import Trellis from './lib/Trellis.svelte';
    import Quiz2 from './lib/Quiz2.svelte';
    import PathBuild from './lib/PathBuild.svelte';

</script>

<main>

  <body>
    <header>
      <h1 style="font-size: 50px">The Great Archaea Mystery</h1>
      <h3 style="text-align: center; padding-bottom: 0.4em"> An interactive lesson on computational biology and Viterbi decoding.</h3>
    </header>
    <!-- <hr> -->
    <!-- <br> -->
    <p style="text-align: center"> <em>Suppose you are a world-famous computational biologist. </em></p>
    <p style="text-align: center"> You recently discovered a new species of <strong> Archaea</strong>, single-celled microorganisms that make up one of the main domains of life on earth. 
      </p>

    <div class="imageWrap">
      <div class="flexwrap">
      <div  class="innerimage">
        <div class="tableImg">
        <img style="max-height:400px" src="./images/lokiCastle.jpeg" alt="loki's castle underwater hydrothermal vent structure">
        <Collapsible headerText={'Read Me!'} >
          <div class="content">
            This Archaea was found living in an extreme environment of high pressure and high temperature near hydrothermal vents (underwater volcanoes!). 
          </div>
        </Collapsible>
      </div>
      </div>
      
    </div>
    <div class="flexwrap">
      <div  class="innerimage">
        <div class="tableImg">
        <img style="max-height:400px" src="./images/archaea.jpeg" alt="Archaea clip art with labelled parts">
        <Collapsible headerText={'Read Me!'} >
          <div class="content">
            Archaea are distinct from other domains of life because they lack of nuclei (and any interior membranes) and have unique protein composition.
          </div>
        </Collapsible>
      </div> 
    </div>
  </div>

  </div>

    <p> Your friend was able to sequence large sequences of DNA, the genetic code of cellular function, from this archaea. 
      Now with the DNA, you have to figure out all that you can about this new species.  
      How does it survive in such extreme temperatures? 
      What makes it different from other species of Archaea? 
      How is it evolutionarily related to other species and other domains of life?
    </p>

    <p style="text-align: center; font-size: 20px"> <em> Welcome to the Great Archaea Mystery! </em></p>
    <hr>

    <h2> Biology background</h2>

    <p>
      <strong>DNA</strong> is a double-stranded sequence of molecules called nucleotides that contains the genetic instructions for an organism. 
      There are four nucleotides found in DNA: adenine (A), thymine (T), guanine (G), and cytosine (C). 
    </p>
    <p> 
      We can study DNA as a sequence of these values, which makes up a code to direct all protein synthesis and functionality for the cell. 
    </p>

    <!-- Some subsequences, called genes, contain the code for specific proteins, such as structural proteins that make up the cell wall, membrane, or skeleton. -->

    <div class="imageWrap">
    <div class="innerimage" >
    <div class="tableImg">
        <img src="./images/DNA.jpeg" alt="Diagram of DNA, RNA, amino-acid sequence, and protein">
        <Collapsible headerText={'Learn More!'} >
          <div class="content">
            Information flow in cells. 
            <br>
            <br>
            Some <strong>DNA</strong> is transcribed into RNA, which allows for increased control and regulation of many cellular processes. 
            <br>
            <br>
            Some <strong>RNA</strong>, called messenger-RNA, is translated into strands of complex molecules called <strong>amino-acids</strong>, which are folded into proteins. 
            <br>
            <br>
            <strong>Proteins</strong> make up the majority of structure and function of cells and are hugely diverse and highly-regulated for control and responsiveness of cellular processes.
          </div>
        </Collapsible>
      </div>
    </div>
    </div>
    

    <p> Archaea have a single circular piece of DNA that can be anywhere from 0.5-7 million nucleotides long. 
      To investigate our Archaea, 
      we want to find protein-coding DNA regions and determine their function. 
    </p>
    
    <hr>

    <h2> Identifying protein-coding regions </h2>
    <!-- <p> 
      
      By recognizing certain patterns of nucleotides that are associated with known protein functionality, we can start to understand this DNA. 
    </p> -->
    <p>
      In organisms that live at high temperatures, regions that encode for structural proteins are known to have higher frequencies of guanine (G) and cytosine (C) nucleotides, or higher GC content, than other regions. 
    </p>
    <p>
      In the DNA sequence below, select the nucleotides that you think encode for structural proteins, 
      given we know the corresponding DNA sequences have high GC content.
    </p>

    <div class="wrapDNA">
      <DnaSelector/>
    </div>

    <p> You might first select all G and C nucleotides. 
      But those selections are actually very unlikely, because protein-encoding regions are known to be continuous and long (often > 100 nucleotides in length!).
      So, we expect large stretches of nucleotides in the same state even if there are many A or T nucleotides in highGC regions.
      This means that the probability of <strong> transitioning </strong>between states (highGC to lowGC, or lowGC to highGC) is low.
    </p>

    <p> The most likely sequence of states will differ depending on the probability of transitioning between states and the probability of seeing an A or T nucelotide in a high-GC region.
      We call these the <strong> transition </strong> and <strong> emission probabilities</strong>. The tradeoff between them makes up the core statistical problem of what we call "hidden state decoding". 
    </p>

    <p> We can use a statistical model to help us quantify and solve this problem. </p>

    <hr>
    <h2> Hidden Markov Models</h2>
    <p> Hidden Markov Models (HMMs) are popular statistical tools used to model a sequence of observations attributable to sequential hidden states. 
        In HMMs, the core assumption is that the probability of each state depends only on the previous state, 
        and the probability of an event depends only on the current state.
    </p>


    <div class="imageWrap">
      <div class="innerimage" >
      <div class="tableImg">
        <img src="./images/hmmMe.jpeg" alt="diagram of HMM with three states and three observations" style='max-width: 600px'>
        <Collapsible headerText={'Learn More!'} >
            <div class="content">
              We can depict HMMs with a graph diagram, as shown above, where the top row represents the sequence of hidden states, <Katex>{String.raw`s_i`}</Katex>, and the bottom row represents the observations,<Katex>{String.raw`o_i`}</Katex>, generated from those states. 
            </div>
          </Collapsible>
        </div>
      </div>
      </div>

    <p> Applying HMMs to our problem, the status of low- or high-GC region at every nucleotide are the hidden states, and the nucleotides observed are the resulting observations from each state.</p>
    <p> Suppose the transition and emission probabilities for low- and high-GC regions in Archaea are the following:</p>

    
    <div class="imageWrap">
      <div class="innerimage" >
      <div class="tableImg">
        <img src="./images/probs.jpeg" alt="diagram of HMM with three states and three observations" style='max-width: 650px'>
        <Collapsible headerText={'Learn More!'} >
            <div class="content">
              <!-- These transition and emission probabilities can also be described with the following tables:
              <Table/>   -->
              This means, for example, that if we are currently in a lowGC state, there is a 30% chance that we will observe an 'A' nucleotide, and there is an 80% chance that we will stay in a lowGC-state and a 20% chance of transitioning to a highGC state, for the next nucleotide.           
            </div>
          </Collapsible>
        </div>
      </div>
      </div>

    <p> Given the assumptions of our HMM, the total probability of a sequence of hidden states will be the cumulative 
      probability of each state given the previous state, <Katex>{String.raw`P(s_i | s_{i-1})`}</Katex>,
      and the probability of each observation given the current state, <Katex>{String.raw`P(o_i | s_i)`}</Katex>. 

      We can represent the total probability of a sequence of hidden states with the following equation:</p>


    <div class="imageWrap">
      <div class="innerimage" >
      <div class="tableImg">
    <div class="math">
      <Katex>{String.raw`P_{n} = \prod_{k=1}^{n} P(s_i | s_{i-1}) P(o_i | s_i)`}</Katex>
    </div>
    <Collapsible headerText={'Wait... what??'} >
      <div class="content">
        The probability of some event <Katex>{String.raw`x`}</Katex> given some condition <Katex>{String.raw`y`}</Katex> is notated <Katex>{String.raw`P(x|y)`}</Katex>.
        <br>
        <br>
        Pi (<Katex>{String.raw`\prod`}</Katex>) Notation, or Product Notation, is used to indicate repeated multiplication, similar to <Katex>{String.raw`\sum`}</Katex> for addition. 
        <br>
        <br>
        Given the assumptions of our HMM, the total probability of a sequence of hidden states is the probability of each state transition and each emission in the resulting state, all multiplied together.
        We start with the first nucleotide at position <Katex>{String.raw`k=1`}</Katex>, and end with the last nucleotide at <Katex>{String.raw`k=n`}</Katex>, given there are <Katex>{String.raw`n`}</Katex> total nucleotides. 
        <br>
        <br>
        At <Katex>{String.raw`k=1`}</Katex>, we need to know the initial state probabilities for both states, which for simplicity we say are equal. <br> <Katex>{String.raw`P(s_1)=0.5`}</Katex>.

      </div>
    </Collapsible>
    </div>
    </div>
    </div>

    <p> Using this equation and the probabilities above, 
      let's calculate the probability of our selected sequence of hidden states.
      Change your selections to try and find the maximum-probability sequence!
    </p>


    <ProbCalc hiddenStates={hiddenStates}/>


    <p> It is hard to find the maximum-probability sequence! To guarantee we will find the best one, using a <em> brute force method</em>, how many sequences will we have to try, if <Katex>{String.raw`n`}</Katex> is the length of the sequence and <Katex>{String.raw`S`}</Katex> is the number of possible states at each event?  </p>
    <Quiz/>

    <p> To do this for our example, given a sequence of 31 nucleotides (<Katex>{String.raw`n=31`}</Katex>) and 2 states (<Katex>{String.raw`S=2`}</Katex>), we would have to calculate the probability of <br> <Katex>{String.raw`S^n=2,147,483,648`}</Katex> sequences!!! This is practically impossible!!</p>
    
    <p> Is there a better way?</p>
    <!-- <p> There are many other applications of HMMs for probem solving. 
      Given a sequence of observations and known hidden states, we could build HMMs for specific cases. 
      Given a built model with emission and transition probabilities, we could generate "realistic" sequences. 
      Given a built model and a relevant DNA sequence, we could decode the likely hidden states across the sequence.

      For our purposes, the decoding problem is most relevant. Given our Archaeal DNA, we want to find genes and classify them into categories to better understand their function.
    </p> -->

    <hr>
    <h2> The Viterbi Algorithm </h2>
    <p> The Viterbi Algorithm can be used to decode the most likely sequence of hidden states given a sequence of observations. </p>

    <p>
      You might notice that there is often a lot of redundancy in calculating the probabilities of sequences of states. 
      Because of the Markov assumptions, the optimal sequence of hidden states through some state <Katex>i</Katex>, <Katex>{String.raw`P_{i}`}</Katex>, must include the optimal sequence of hidden states through the previous state <Katex>i-1</Katex>, <Katex>{String.raw`P_{i-1}`}</Katex>, ending in the optimal state at <Katex>i-1</Katex>.
      Since we can reference a smaller optimization problem in the full solution, we can reuse computation to find the full solution much more efficiently than the brute force method. 
    </p>

    <p> If this doesn't make any sense, don't worry. Let's go through some examples. We can visualize the sequences of hidden states, or paths, 
      using a simple "trellis" diagram, where any sequence of hidden states can be drawn as a path from left to right on the diagram.</p>


    <Trellis/>


    <p> 
      Generalizing these equations, if we know the optimal sequences through the previous nucleotide <Katex>{String.raw`P_{i-1,k}`}</Katex> ending in every possible state <Katex>k</Katex>,
      the optimal next sequence <Katex>{String.raw`P_{i,k}`}</Katex> ending in state <Katex>k</Katex> will be the most probable of the following options (assuming there are only 2 states, h and l).
    </p>

    <div class="math">
      <Katex>{String.raw`P_{i,k} =  max\left\{
        \begin{array}{l}
          P_{i-1,l}*P(k|l)*P(o_i|k)\\
          P_{i-1,h}*P(k|h)*P(o_i|k)
        \end{array}
      \right.
      `}</Katex>
    </div>

    <p> So, we can follow this system of solving for the optimal path probability of larger and larger sequences. 
      At each step we store the probabilities of the "family" of optimal suproblems, 
      <Katex>{String.raw`P_{i,l}`}</Katex> and <Katex>{String.raw`P_{i,h}`}</Katex>, 
      so we can use them in the next step. This system of building larger and larger solutions, reusing computation, is called <em> dynamic programming</em>, and is an advanced tool for solving complex computations efficiently. </p>


    <p> We can visualize this system with a table of the optimal subproblem probabilities, given 2 states and n observations. 
      For each subproblem, we use the previous optimal probabilities and keep track of which of the two options was best with "backpointers", indicated as arrows.
      Solve the subproblems of increasing size to find the probability of the optimal full path! </p>

    <VitTable/>

    <p> Nice job! The probability of the optimal full path is the maximum of the two options in the last column, <Katex>{String.raw`P_{33,l}`}</Katex> and <Katex>{String.raw`P_{33,h}`}</Katex>. </p>

    <p> But what is the corresponding optimal path? To find this, we have to backtrack through the table to find the choices we made at each <Katex>max</Katex> function, indicated with our backpointers. 
      Follow them from the end to the front, selecting the highGC nucleotides, to build the optimal path!</p>

    <PathBuild/>

    <p> Great! Now we found one structural-protein coding region in our section of Archaeal DNA! That means this sequence is likely used to make proteins for the cell wall, membrane, and/or skeleton.</p>

    <p> Using a sequence-comparison tool that your friend made, 
      you find that this sequence is the same as the sequence for <strong> actin</strong>, 
      a common protein thought to be found only in Eukarotic organisms, which plants and animals are.</p>

    <p> Archaea and Eukaryotes are thought to be different domains of life.</p>

    <Quiz2/>
    
    <p> This discovery completely changes our theory of the tree of life! 
      The discovery of this Archaea, named <strong> Lokiarchaea </strong>, among other related species (some of which are named after Thor and Odin), led to the 
      refactoring of the <strong> eukaryogenesis theory</strong>, or the theory of how eukaryotes first came to be. 
    </p>

    <div class="imageWrap">
      <div class="innerimage" >
      <div class="tableImg">
          <img src="./images/asgard.png" alt="Diagram of DNA, RNA, amino-acid sequence, and protein">
          <Collapsible headerText={'Learn More!'} >
            <div class="content">
              Before this discovery, Eukaryotes were thought to have evolved after a prokaryotic cell (either bacteria or archaea) engulfed another cell. 
              <br>
              <br>
              The <strong>three-domain</strong> tree of life was the dominant theory taught in all biology classes around the world.
              But in the last decade, after more and more of these Archaea were discovered and studied using computational biology techniques, 
              scientists have found strong evidence for a <strong> two-domain</strong> tree of life, where Eukaryotes developed from Archaea directly. 
              </div>
          </Collapsible>
        </div>
      </div>
      </div>

    <p> This breakthrough has huge implications for how we understand evolution, Archaea, and even ourselves. 
      Archaea were largely understudied organisms and often thought to be more similar to bacteria than to eukaryotes. 
      Now, researchers all over the world are opening their eyes to these fantastically complex species and rushing to uncover their secrets.
      While the two-domain tree of life is an important piece of the puzzle, the mystery of eukaryogenesis is still largely unsolved. 

      <br> <br>
      <em>
    How did this immense complexity of life develop? How were bacteria and viruses involved? Where do we go from here? </em> </p>

    <hr> 
    <h2> Reflect and Review!</h2>

    <ul>
      <li style="text-align:left"> Archaea are single-celled microorganisms that often live in extreme environments.</li>
      <li style="text-align:left"> Viterbi decoding is a dynamic programming technique used to find the most likely sequence of hidden states using data that follows the assumptions of a Hidden Markov Model.</li>
      <li style="text-align:left"> You used Viterbi decoding to find one structural-protein encoding region in a sequence of Archaeal DNA, and this region was extremely similar to one thought to only exist in eukaryotes! </li>
      <li style="text-align:left"> This led to a new theory of the tree of life, where Eukaryotes developed directly from Archaea rather than separately. </li>

    </ul>

  </body>

  <footer>
    <hr>
    <p> <strong> by Grace Dessert, March 2023 </strong> </p>
    <p style="margin: 0px">Check out my <a href="https://github.com/dessertgrace/viterbi">code on GitHub</a>.</p>
    <h3> Thanks for engaging with this interactive lesson! </h3>
    <p style="margin: 0px"> The content is based on real breakthroughs in biology over the past decade. Read this seminal scientific paper to learn more!</p>
    <ul>
      <li> <a href="https://doi.org/10.1038/nmicrobiol.2016.48"> Hug, L., Baker, B., Anantharaman, K. et al. A new view of the tree of life. Nat Microbiol 1, 16048 (2016).</a></li>
    </ul>
    <!-- <br> -->
    <h3> Acknowledgements: </h3>
    <ul>
      <li> Thank you to my sister Juju for help with biology and inspiration to study Archaea.</li>
      <li> Thank you to my brother Daniel for being my guinea pig student and for constructive edits.</li>
      <li> Thank you to so many of my friends for listening to me talk about this project constantly and providing contructive edits. </li>
    </ul>
    <h3> Image references:</h3>
    <ul>
      <li> <a href="https://avikdas.com/assets/images/2019-06-24-dynamic-programming-for-machine-learning-hidden-markov-models/hmm-bare.png"> HMM Image </a></li>
      <li> <a href="https://www.cis.upenn.edu/~cis2620/notes/Example-Viteri-DNA.pdf"> UPenn Viterbi Example</a> </li>
    <li> <a href="https://images.allthescience.org/slideshow-mobile-small/archaebacteria-diagram.jpg"> Archaea Image </li>
      <li> <a href="https://media.npr.org/assets/img/2015/05/05/lokis-castle_custom-7e6ab7912fe71c61c115ccc29515ec924140f561.jpg"> Loki's Castle Image </li>
    <li> <a href="https://astrobiochem.files.wordpress.com/2019/02/sample-essay-on-regulation-of-gene-expression.jpg?w=810"> DNA image </li>
      <li> <a href="https://biologicalsciences.blogs.bristol.ac.uk/2019/12/09/our-deep-origins-deciphering-the-earliest-branches-on-the-tree-of-life/"> Tree of life image </li>

    </ul>
  </footer>

</main>

<style>

header {
  background-color: rgb(210, 228, 229);
  border: 10px rgba(26, 8, 80, 0.24) double;
  max-width: 900px;
  margin: 1.5em auto;
  margin-bottom: 3em;
  padding: 10px;
  border-radius: 20px;
}

hr {
  margin: 40px 0;
  border: 1px solid rgb(165, 167, 167);
  margin-top: 50px;
}

  .imgSelector {
    /* position: relative; */
    /* bottom: 5px;
    left: 10px; */
    width: 120px;
    padding: 5px;
    /* margin: 5px; */
    background-color: rgb(237, 237, 237);
    grid-row: 2 / 3;
  }

  .math {
    font-size: 30px;
    margin: 0.5em;
    margin-bottom: 0.9em;
  }

  .tableImg {
    display: table;
	  table-layout: fixed;
  }

  .innerimage {
    display: grid;
    gap: 10px;
    border: 10px white solid;
    background-color: white;
    border-radius: 5px;
    /* max-width: 600px; */
  }

  /* .innerimage img {
    grid-row: 1/2;
  } */


  .imageWrap {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 0 auto;
    padding: 1em 0;
    /* flex-direction: column; */
  }

  img {
    width:100%;
  }


h2 {
  text-align: start;
}

p {
  text-align: start;
  margin-top: 2em;
  margin-bottom: 2em;
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

  :global(p){
    margin: 30px auto;
  }

main {
  max-width: 1200px;
  /* margin: 0 auto; */
  background-color: rgb(210, 228, 229);
  color: #1a0850;
  margin: 0px auto;
}

/* If the screen size is 600px wide or less, set the font-size of <div> to 30px */
@media screen and (max-width: 600px) {
  body {
    font-size: 16px;
  }
  .math {
    font-size: 16px;
  }
  button {
    font-size: 14px;
  }
}




</style>
