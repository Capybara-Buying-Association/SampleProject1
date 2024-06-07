note:
css is heirachical
the style declared with the most precision will be taken
e.g

div {
    background-color: red;
} 

div.class#id {
    background-color: purple;
} 

div.class {
    background-color: blue;
} 

background color will be purple

if two styles with equal precision are declared the one lower in the css file will be used (can be useful when using media rules to declare styles for different screen sizes)