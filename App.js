/**
 * <div id="parent">
 *   <div id = "child">
 * <h1> i am a h1 tag</h1>
 * <h2> i am a h2 tag </h2>
 * </div>
 * </div>
 * 
 * 
 * React.createElement(it is an object)=> HTML(Browser Understand)
 * 
 * 
 */




const Parent = React.createElement("h1",{id:"Parent"},
    React.createElement("h1",{id:"child1"},[
        React.createElement("h1",{},"i am h1 tag"),
        React.createElement("h2",{},"i am h2 tag"),  
        ]),
        React.createElement("h1",{id:"child2"},[
        React.createElement("h1",{},"i am h1 tag"),
        React.createElement("h2",{},"i am h2 tag"),  
        ]),
        
    );
    
console.log(Parent);
const root = ReactDOM.createRoot (document.getElementById("root"));

root.render(Parent);

