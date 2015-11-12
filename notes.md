switch between executing the main timeline and IO tasks
on update, check if there are any IO events defined for that
frame.  If so, perform the timeline updates and then switch
control of the main thread over to the IO task parameterized
by the schema.  

Execution of the timeline should be performed by taking the 
current Sequence frame and passing it to a render function
along with the timeline definition for each asset.  The render
system is immediate-mode using something React-js or a similar
concept and will produce a complete tree representing what 
should be in the scene at that moment.
