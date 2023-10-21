function depthFirstSearch(graph, startNode, targetNode) {
    var visitedNodes = new Array(graph.length).fill(false); //Create and fill the visited list with all falses

    return searchGraph(graph, startNode, targetNode, visitedNodes, []);
}

//As the easiest way to do this is with recursion I created a new function that will actually do the searching
function searchGraph(graph, start, target, visitedNodes, path) {

    //Add the starting node to the path
    path.push(start);

    //Check to see if the current node if the target node and if it is we are done so return the path
    if(start == target) {
        return path;
    }
    else {
        visitedNodes[start] = true; //Mark the current node as visited
        //The following for each loop does the recursive search
        for (node of graph[start]) {
            if(visitedNodes[node] == false) {
                return searchGraph(graph, node, target, visitedNodes, path);
            }
        }
    }
    return [];
}
