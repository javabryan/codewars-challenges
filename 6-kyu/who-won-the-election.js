/*
https://www.codewars.com/kata/554910d77a3582bbe300009c/train/javascript

In democracy we have a lot of elections. For example, we have to vote for a class representative in school, for a new parliament or a new government.

Usually, we vote for a candidate, i.e. a set of eligible candidates is given. This is done by casting a ballot into a ballot-box. After that, it must be counted how many ballots (= votes) a candidate got.

A candidate will win this election if he has the absolute majority.
Your Task
Return the name of the winner. If there is no winner, return null (in Java and JavaScript), None (in Python), nil (in Ruby), or * in C.

Task Description
There are no given candidates. An elector can vote for anyone. Each ballot contains only one name and represents one vote for this name. A name is an arbitrary string, e.g. "A", "B", or "XJDHD".

There are no spoiled ballots.

The ballot-box is represented by an unsorted list of names. Each entry in the list corresponds to one vote for this name. You do not know the names in advance (because there are no candidates).

A name wins the election if it gets more than n/2 votes (n = number of all votes, i.e. n is equal to the size of the given list).
Examples

//3 votes for "A", 2 votes for "B" -> "A" wins the election
getWinner(["A", "A", "A", "B", "B"]) === "A" //true
//2 votes for "A", 2 votes for "B" -> No winner
getWinner(["A", "A", "B", "B"]) === null //true
//1 vote for each name -> No winner
getWinner(["A", "B", "C", "D"]) === null //true
//3 votes for "A", 2 votes for "B", 1 vote for "C"  
//-> No winner ("A" does not have more than n/2 = 3 votes)
getWinner(["A", "A", "A", "B", "B", "C"]) === null //true

Note
Please keep in mind the list of votes can be large (n <= 1,200,000). The given list is immutable, i.e. you cannot modify the list (otherwise this could lead to vote rigging).

Good luck and have fun.
*/

const getWinner = list => {
  const cands            = [...new Set(Array.from(list).sort())]
  const tally            = {}
  const totals           = [];
  const min_votes_needed = Math.floor(list.length / 2) + 1
  let   leader           = null;

  console.log(min_votes_needed);
  for (const key of cands) tally[key] = 0
  for (let v = 0; v < list.length; v++) tally[list[v]]++
  for (let c = 0; c < cands.length; c++) {
    if (tally[cands[c]] > tally[leader] || leader === null) {
      leader = cands[c];
    }
  }

  for (const v in tally) {
    if (totals.includes(tally[v])) {
      leader = null;
      break;
    }
    totals.push(tally[v]);
  }

  return tally[leader] >= min_votes_needed ? leader : null;
}

console.log(getWinner(["A"]), "a expected");
console.log(getWinner(["A", "A", "A", "B", "B", "B", "A"]), "a expected");
console.log(getWinner(["A", "A", "A", "B", "B", "B"]), "NULL expected");
console.log(getWinner(["A", "A", "A", "B", "C", "B"]), "NULL expected");
console.log(getWinner(["A", "A", "B", "B", "C"]), "NULL expected");