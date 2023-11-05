const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

//The part where the test creates the adjacency list is just taken from Countmooshroom
//Ill probably come back later and maybe change it to a matrix to see if it works with both a list and matrix but for now its good enough
const test =
    jsc.forall("array (pair nat nat)", function(edges) {
        var max = edges.reduce(function(a, b) { return Math.max(a, Math.max(b[0], b[1])); }, 0);
        //Create our Adjacency List
        var list = [];
        for(var i = 0; i <= max; i++) {
            list[i] = [];
            for(var j = 0; j < edges.length; j++) {
                if(edges[j][0] == i) list[i].push(edges[j][1]);
            }
            list[i].sort(function(a, b) { return a - b; });
            list[i] = [...new Set(list[i])];
        }

        //Create random start and end
        var start = Math.round(Math.random() * (list.length - 1));
        var end = Math.round(Math.random() * (list.length - 1));

        //Run function
        var path = depthFirstSearch(list, start, end);

        //Now we check if the function worked
        if (path.length > 0) {
            //Check to see if the starting and ending nodes are correct
            if (path[0] == start && path[path.length - 1] == end) {
                return true;
            }

            //Check to see if the path is valid/all of the nodes are connected
            for(var i = 0; i < path.length; i++) {
                if(list[path[i]].includes(path[i+1]) == false) { //This actually checks that the node connects to the next node
                    return false;
                }
            }
        }

        //I have to come back eventually and fix this part as im not sure what to do if the function returns that there is no path
        //Im not sure how to check it. I think I will maybe try to find a library that does the same as this and then compare the results.
        return true;
    });
jsc.assert(test, { tests: 100000 });