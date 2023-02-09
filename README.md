# 1mg-express-server
Repository of the Express running server for Online Pharmacy Project <br/><br/>
Live link : https://clean-crab-sneakers.cyclic.app/
<br/>

# Tech Stack :
      Node, Express, Mongoose, Mongodb

# Dependencies :
      axios, bcrypt, cors, dotenv, express, jsonwebtoken, mongoose, morgan
      
# Routes : 
 ## default
  
    /          

 Server running

 <br/>
        
## products
  
    /api/products
    
  Fetch products 
  
  <br/>
        
     /api/products/getfilters
     
  Fetch filters of applied category or query
  
  <br/>
        
      /:id
      
  Fetch details of single product
  
  <br/>
        
## oauth
      
      /api/oauth/google
      
   Google authentication
   
   <br/>
      
## user
  
      /api/user/getuserdetails
      
  Fetch user details
      
      /api/user/registeruser
      
  Register new user
      
      /api/user/loginuser
      
  Logs in user providing a token as response
      
## cart
   
      /api/cart (base)  
      
  Applied middleware to verify user
      
      /api/cart/getcart
  Get cart details of current user
      
      /api/cart/deleteitem" 
  Delete a particular item from the cart
      
      /api/cart/emptycart
  Empty while cart of a user
      
      /api/cart/add
  Adds an item to an existing cart or upserts an item
      
      /api/cart/updatequantity
  Update quantity of a particular item inside a cart
