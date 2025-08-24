# Whisky Recognition and Recommendation App 
An app that can recognize 100 kinds of whiskies and recommend other whiskies with similar or opposite flavour profile, providing available shops in Hong Kong and price distribution.

## Goal
We would like to develop an user-frendly platform for whisky lovers to explore various kinds of whiskies from around the world. Through the image recognition and the flavour recommendation in this platform, the users just need to upload the image of their beloved whisky, so that the platform will provide a detailed analytical profile of that whisky within seconds,including price information, keys words from the reviews about the target whiskies, with two recommendation lists about whiskies with similar and oppsite flavours,respectively. 

<img width="600" alt="127619835-8b2c257a-b78a-40c2-b0b5-7f593f72d626" src="https://user-images.githubusercontent.com/43593664/127621929-6b50125b-97b7-40b4-a95a-432833814180.png">

## Data Collection
We defined the top 100 whiskies in the world as the whiskies within the top 100 rank in a famous whisky information website, "Whisky.com".

### Whisky Images
The images of whiskies were collected through google search, around 20 to 30 for each kind. In total, over 2500 images were collected.

### Whisky Reviews and Flavours
By web scraping from alcohol shopping website, Master of Malt, the reviews of the top 100 whiskies were collected. And We have collected tasting notes given by expert of the 100 whiskies from international whisky community for a reliable recommendation system.

### Price Information
We performed web-scraping on Hong Kong Liqour Store, Watsons Wine and Price.com to collect the availability and price of the top 100 whiskies. The reasons we chose these 3 websites as the first two are the most popular liquor retails in Hong Kong and they provide both online and offline service that can be easily accessed by users. For Price.com, it’s a platform that lists out the available local stores.

The difference in data format and language create extra difficulties when combining the data. Extra effort was used to clean and preprocess the data to create a unique results.  It also limited the function that we would like to perform. For examples, there is no suitable free API for the Chinese address in Price.com which we cannot present all location in a map within our application. 

## Image Recognition

### Image Preprocessing
We collected over 2,500 images, approximately 25 per whiskey. We cropped each image to focus solely on the bottle, enabling the model to concentrate on the bottle itself. To enhance the model’s ability to recognize whiskeys from various angles and backgrounds, we applied random image augmentations, including cropping, Gaussian blur, contrast adjustment, noise, zoom, rotation, and shearing. This process generated more than 25,000 images, which were then used to train our model.

### Build Model
To classify 100 whiskey types based on images, we trained an InceptionV3 model, a robust neural network designed for image recognition, using the augmented whiskey images. We froze the convolutional layers and replaced the fully connected layers with three new fully connected layers, each containing 200 nodes. The output layer has 101 nodes, corresponding to 100 whiskey types and one non-whiskey class.

## Recommendation System
The recommendation system is built upon the database of flavour scores of different whisky distilleries from the international whisky community using consine distance but no Euclidean distance. It is because the balance between flavours is more crutial than their absolute values. Consine distance focuses on the pattern of flavour profile instead of the individual value, which fits our goal. 

## App Development
We integrated the image recognition model and recommendation system into an app using Flask as backend system and React as frontend server. 

### Home Page
In the home page, there are 2 kinds of searching methods provided to users, one recognizing the whisky from the image and one allowing user to set their prefered flavour profile by adjust the sliding bar to recommend whiskies with similar flavours.

<img width="380" alt="image" src="https://user-images.githubusercontent.com/43593664/129532821-68afd885-2ae3-46bd-bb78-d860b0de4bbf.png">


To use the searching method of image recognition, the user just need to upload their image to the app, and the app will send the image back to our flask server to process. Once the image is classified as a specfic whisky we have defined, the result together with the link redirected to the detail page of that whisky will be returned back to the home page. 

<img width="380" alt="image" src="https://user-images.githubusercontent.com/43593664/129532868-00b00cbb-b37a-4e04-a8fc-6d42068ea889.png">


If the users want to search using their customized flavour profile, they may choose the second method in which they can adjust the sliding bar of the 4 suggested flavours. If they want more delicated flavour, they may click "More Flavours" button to expand the list showing more available flavours. Once clicking "Submit" button, the customized profile will be sent back to server to analyze using recommendation system which use consine distance to compare the similarity between the flavour profile of different whiskies. The system will return a list of whiskies under the same distillery and the top 5 of other distilleries with similar taste. 

<img width="380" alt="image" src="https://user-images.githubusercontent.com/43593664/129532986-206bc0b9-215c-4d6b-8217-85d639e7dee1.png">


### Detail Page
Each whisky has its own detail page. This page shows the word cloud of key words common in reviews, letting user to have a sence what this whisky taste like before purchasing. The words in the reviews of whiskies were tokenized and transformed into term frequency–inverse document frequency (tf-idf). The higher tf-idf implies that the corresponding word is common in the reviews of a particulat whisky but rare in the reviews of others.

<img width="380" alt="image" src="https://user-images.githubusercontent.com/43593664/129532305-ba1faa13-3983-451a-aa1a-96eb676c3a54.png">

Moreover, the user can figure out the price distribution of the whisky and shops having it in Hong Kong, so that they can buy it with the cheapest price.

<img width="380" alt="image" src="https://user-images.githubusercontent.com/43593664/129532351-82188c15-3798-484e-a687-5d86e315fd2e.png">

At the bottom of the page, there are 2 sliders presenting whiskies with similar or opposite flavour profile.
  
<img width="380" alt="image" src="https://user-images.githubusercontent.com/43593664/129532382-e36208d2-5227-412c-ad64-882e25de0bc2.png">

