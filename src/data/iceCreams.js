<<<<<<< HEAD
const iceCreams = [
    { id: 1, name: "Strawberry", price: 500, image: "strawberry.jpg" },
    { id: 2, name: "Chocolate", price: 600, image: "chocolate.jpg" },
    { id: 3, name: "Vanilla", price: 550, image: "vanilla.jpg" },
    { id: 4, name: "Pistachio", price: 650, image: "pistachio.jpg" },
    { id: 5, name: "Mint", price: 620, image: "mint.jpg" },
    { id: 6, name: "Mango", price: 700, image: "mango.jpg" },
  ];
  
  export default iceCreams;
  
  
  
=======
const baseIceCreams = [
  { id: 1, name: "Vanilla", price: 500, image: "vanilla.jpg" },
  { id: 2, name: "Chocolate", price: 600, image: "chocolate.jpg" },
  { id: 3, name: "Strawberry", price: 550, image: "strawberry.jpg" },
  { id: 4, name: "Mint", price: 580, image: "mint.jpg" },
  { id: 5, name: "Pistachio", price: 620, image: "pistachio.jpg" },
  { id: 6, name: "Mango", price: 590, image: "mango.jpg" },
];

// Дублируем мороженое для демонстрации 
const iceCreams = Array.from({ length: 10 }, (_, i) => {
  return baseIceCreams.map(item => ({
    ...item,
    id: item.id + i * baseIceCreams.length,
    name: `${item.name} #${i + 1}`
  }));
}).flat();

export default iceCreams;
>>>>>>> main
