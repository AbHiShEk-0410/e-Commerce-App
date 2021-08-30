const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const products = [
	{
		name: "Potato",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/40023476-2_2-fresho-potato-organically-grown.jpg",
		price: 20,
		amount: 1,
		unit: "kg",
		delivery: 1,
	},
	{
		name: "Capsicum",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000069-2_28-fresho-capsicum-green.jpg",
		price: 15,
		amount: 1,
		unit: "kg",
		delivery: 2,
	},
	{
		name: "Ginger",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/40023480-2_1-fresho-ginger-organically-grown.jpg",
		price: 10,
		amount: 100,
		unit: "gm",
		delivery: 1,
	},
	{
		name: "Cucumber",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000599_12-fresho-cucumber-english.jpg",
		price: 15,
		amount: 1,
		unit: "kg",
		delivery: 2,
	},
	{
		name: "Brinjal",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000056-2_2-fresho-brinjal-green-long.jpg",
		price: 25,
		amount: 1,
		unit: "kg",
		delivery: 1,
	},
	{
		name: "Beans",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000274-2_2-fresho-beans-cowpea.jpg",
		price: 15,
		amount: 250,
		unit: "gm",
		delivery: 1,
	},
	{
		name: "Knol Khol",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000278_12-fresho-knol-khol.jpg",
		price: 20,
		amount: 500,
		unit: "gm",
		delivery: 3,
	},
	{
		name: "Tomato",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/40022638_3-fresho-tomato-local-organically-grown.jpg",
		price: 20,
		amount: 1,
		unit: "kg",
		delivery: 1,
	},
	{
		name: "Sweet Potato",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/50000555_5-fresho-sweet-potato-organically-grown.jpg",
		price: 30,
		amount: 1,
		unit: "kg",
		delivery: 1,
	},
	{
		name: "Onion",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000148_29-fresho-onion.jpg",
		price: 40,
		amount: 1,
		unit: "kg",
		delivery: 1,
	},
	{
		name: "Radish",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000164-2_2-fresho-radish-white.jpg",
		price: 15,
		amount: 1,
		unit: "kg",
		delivery: 2,
	},
	{
		name: "Cauliflower",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000074-2_2-fresho-cauliflower.jpg",
		price: 35,
		amount: 1,
		unit: "kg",
		delivery: 1,
	},
	{
		name: "Coccinia",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000091-2_1-fresho-coccinia.jpg",
		price: 25,
		amount: 300,
		unit: "gm",
		delivery: 3,
	},
	{
		name: "Venthaya Keerai",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000112-2_2-fresho-methiventhaya-keerai.jpg",
		price: 10,
		amount: 1,
		unit: "kg",
		delivery: null,
	},
	{
		name: "Broccoli",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000063-2_2-fresho-broccoli.jpg",
		price: 50,
		amount: 500,
		unit: "gm",
		delivery: 2,
	},
	{
		name: "Beetroot",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000046-2_31-fresho-beetroot.jpg",
		price: 30,
		amount: 1,
		unit: "kg",
		delivery: null,
	},
	{
		name: "Cabbage",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000066-2_31-fresho-cabbage.jpg",
		price: 20,
		amount: 1,
		unit: "kg",
		delivery: null,
	},
	{
		name: "Drumstick",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000109_18-fresho-drumstickmoringa.jpg",
		price: 20,
		amount: 100,
		unit: "gm",
		delivery: 3,
	},
	{
		name: "Mushrooms",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000273-2_19-fresho-mushrooms-button.jpg",
		price: 35,
		amount: 6,
		unit: "piece",
		delivery: null,
	},
	{
		name: "Sweet Corn",
		type: "vegetable",
		img: "https://www.bigbasket.com/media/uploads/p/l/40004992_14-fresho-sweet-corn.jpg",
		price: 30,
		amount: 2,
		unit: "piece",
		delivery: 3,
	},
	{
		name: "Chicken - Curry",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/40048898_5-fresho-chicken-curry-cut-without-skin-antibiotic-residue-free.jpg",
		price: 150,
		amount: "3",
		unit: "piece",
		delivery: null,
	},
	{
		name: "Chicken - Gizzard",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000921_8-fresho-chicken-gizzard-antibiotic-residue-free.jpg",
		price: 50,
		amount: 3,
		unit: "piece",
		delivery: null,
	},
	{
		name: "Chicken Leg",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000903_10-fresho-chicken-leg-boneless-antibiotic-residue-free-2-3-pcs.jpgg",
		price: 250,
		amount: 4,
		unit: "piece",
		delivery: 2,
	},
	{
		name: "Chilli Chicken Piece",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/40118808_3-fresho-chilli-chicken-piece-boneless-antibiotic-residue-free.jpg",
		price: 200,
		amount: 5,
		unit: "piece",
		delivery: null,
	},
	{
		name: "Chicken Liver",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000916_11-fresho-chicken-liver-antibiotic-residue-free.jpg",
		price: 150,
		amount: 3,
		unit: "piece",
		delivery: null,
	},
	{
		name: "Chicken Drumstick",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/10001003_4-fresho-chicken-drumstick-without-skin-antibiotic-residue-free.jpg",
		price: 180,
		amount: 5,
		unit: "piece",
		delivery: null,
	},
	{
		name: "Chicken Boneless",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000924_11-fresho-mixed-chicken-piece-boneless-antibiotic-residue-free-4-6-pcs.jpg",
		price: 450,
		amount: 4,
		unit: "piece",
		delivery: null,
	},
	{
		name: "Chicken Breast",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000901_10-fresho-chicken-breast-boneless-antibiotic-residue-free.jpg",
		price: 350,
		amount: 3,
		unit: "piece",
		delivery: 3,
	},
	{
		name: "Chicken Wings",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000923_9-fresho-chicken-wings-antibiotic-residue-free-4-6-pcs.jpg",
		price: 150,
		amount: 3,
		unit: "piece",
		delivery: 3,
	},
	{
		name: "Chicken Mince",
		type: "non-veg",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000906_9-fresho-chicken-mince-antibiotic-residue-free.jpg",
		price: 230,
		amount: 3,
		unit: "piece",
		delivery: 3,
	},
	{
		name: "Bay Leaf",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/20000457_7-bb-royal-bay-leaftej-patta.jpg",
		price: 40,
		amount: 50,
		unit: "gm",
		delivery: 3,
	},
	{
		name: "Mustard",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/10000485_14-bb-royal-mustardrai-small.jpg",
		price: 43,
		amount: 200,
		unit: "gm",
		delivery: 3,
	},
	{
		name: "Cardomom Green",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/20000463_10-bb-royal-cardamomelaichi-green.jpg",
		price: 50,
		amount: 100,
		unit: "gm",
		delivery: 1,
	},
	{
		name: "Fennel",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/20000475_7-bb-royal-fennelsaunf-small.jpg",
		price: 45,
		amount: 100,
		unit: "gm",
		delivery: 1,
	},
	{
		name: "Black Pepper",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/40073431_10-bb-popular-black-pepperkali-mirch.jpg",
		price: 120,
		amount: 100,
		unit: "gm",
		delivery: 1,
	},
	{
		name: "Cumin",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/40026603_9-bb-royal-cuminjeera-whole.jpg",
		price: 200,
		amount: 500,
		unit: "gm",
		delivery: 1,
	},
	{
		name: "Fenugreek",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/40067275_3-bb-popular-fenugreekmethi.jpg",
		price: 30,
		amount: 100,
		unit: "gm",
		delivery: 1,
	},
	{
		name: "Turmeric Powder",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/100270871_5-eastern-powder-turmeric.jpg",
		price: 70,
		amount: 100,
		unit: "gm",
		delivery: 2,
	},
	{
		name: "Cloves",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/40000224_12-bb-royal-cloveslaunga.jpg",
		price: 250,
		amount: 100,
		unit: "gm",
		delivery: 2,
	},
	{
		name: "Chilli",
		type: "Spices",
		img: "https://www.bigbasket.com/media/uploads/p/l/40018885_10-bb-royal-chilli-guntur-with-stem.jpg",
		price: 280,
		amount: 500,
		unit: "gm",
		delivery: 2,
	},
	{
		name: "Brown Egg",
		type: "egg",
		img: "https://www.bigbasket.com/media/uploads/p/l/40038379_6-fresho-farm-eggs-brown-medium-antibiotic-residue-free.jpg",
		price: 74,
		amount: 6,
		unit: "piece",
		delivery: 2,
	},
	{
		name: "White Egg",
		type: "egg",
		img: "https://www.bigbasket.com/media/uploads/p/l/40094159_2-fresho-farm-eggs-jumbo-large-antibiotic-residue-free.jpg",
		price: 75,
		amount: 6,
		unit: "piece",
		delivery: 2,
	},
];
function setProductsOnServer() {
	// This function is to convert the above array into key value pair for collection on firestore
	products.forEach(async (element) => {
		await admin.firestore().collection("products").add(element);
	});
}
setProductsOnServer();
exports.products = products;
exports.app = functions.https.onRequest((request, response) => {
	functions.logger.info("Hello logs!", { structuredData: true });
	console.log("Working");
	response.send("Hello from Firebase!");
});
