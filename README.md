Procedure to See the Output
============================
  1. Clone this repository on your PC.
  2. Open the 'code' folder.
  3. Open the file 'index.html' in your any of your internet browser (preferably Google Chrome).
  4. Click on the Black Plane to start the random point generation process.

Author's Notes:
===============
Inspired by one of the coding challenges by Daniel Shiffman (https://twitter.com/shiffman)
I decided to try coding the fast poisson disc sampling algorithm. I was successful in generating random points which have at-least 'r' distance from each other.

The paper referred by Daniel is at http://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf

So how does it work?
---------------------

The paper presents an algorithm which helps us generate random points but with one single rule that they don't stick close to each other and keep themselves at-least 'r' distance away from each other.

This Daniel's awesome video (https://www.youtube.com/watch?v=flQgnCUxHlw). I would recommend you to watch it before you read the following.

Ok, this is how the Algorithm goes..

1. Take a domain of any dimension, chose a value for 'r' and implement a grid on it with distance of r/sqrt(2) on all dimensions

2. Have two arrays. One to display the points and the second to help your algorithm verify its neighbors. (The first array is referred as grid and the second is referred as active-list in the paper) 

3. Pick a random sample (point) from the domain and push it in the active-list array

(following steps should be looped)
4. Pick a random sample (lets say sample-x) from the active-list array and find its cell in the grid. 

5. Now generate approximately 30 (can be modified) new samples (points) in the vicinity of the sample-x with one condition i.e their distance from sample-x should be somewhere between r and 2r

6. For each new sample (point) created find its respective cell in the grid. Then verify with all the neighbouring cells that is there any disturbing sample in those neighbouring cells which are less than r distance from the new sample.

7. If the new sample doesn't have any such disturbing neighbour samples closer then push it to the active-list array and the grid array

8. If any disturbing neighbour is found then remove sample-x from the active list.


What I did in my code...
------------------------

Just as Daniel I have used p5.js library to code.

1. I have a chosen a two dimensional domain and a created a plane with 400 x 400 pixels.

2. I have made up my mind to give r the value 10 (for no reason)

3. Then made a grid of cells on the plane with r/sqrt(2) as the height and width of each cell

4. I then created two arrays named grid and activeList.

5. My code then looks for the mouse click as the random input. Once the mouse is clicked the location is considered as my new sample (point) and stored in the grid array on its respective cell and pushed in the activeList array.

Now comes my looping statements.

6. Picked a random sample from the activeList and named it as activeSample. Then I generated about 30 new sample points one after another with a distance somwhere between r and 2r from the from the activeSample.

7. Each time a new sample (point) is generated i named it as newSample and found its respective cell in the grid.

8. Then found all the nine(since 2D plane is chosen) neighbouring cells and verified if those cells have any disturbing samples (points) which are at a distance less than 'r' from the newSample.

9. If there are no disturbing samples close-by then I pushed the newSample into my activeList and my gird arrays.

10. But if any disturbing neighbour sample is found then I remove the newSample from my activeList
