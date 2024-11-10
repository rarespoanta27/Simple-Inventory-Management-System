import { Item } from './types';

let inventory: Item[] = [];

const generateId = (): number => {
    return inventory.length > 0 ? inventory[inventory.length - 1].id + 1 : 1;
};

export function addItem(name: string, description: string, price: number, quantity: number) {
    const newItem: Item = {
        id: generateId(),
        name,
        description,
        price,
        quantity,
        dateAdded: new Date(),
    };
    inventory.push(newItem);
    displayItems();
}

export function modifyItem(id: number, newQuantity: number, newDescription: string, newPrice: number) {
    const item = inventory.find((item) => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        item.description = newDescription;
        item.price = newPrice;
        displayItems();
    } else {
        alert('Item not found');
    }
}

export function removeItem(id: number) {
    inventory = inventory.filter((item) => item.id !== id);
    displayItems();
}

export function displayItems() {
    const itemList = document.getElementById('item-list');
    if (itemList) {
        itemList.innerHTML = inventory.map(item => `
            <div class="item">
                <h3>${item.name}</h3>
                <p>Description: ${item.description}</p>
                <p>Price: ${item.price.toFixed(2)} Lei</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Date Added: ${item.dateAdded.toLocaleDateString()}</p>
                <button onclick="window.modifyItem(
                    ${item.id}, 
                    parseInt(prompt('Enter new quantity:', '${item.quantity}') || '${item.quantity}'),
                    prompt('Enter new description:', '${item.description}') || '${item.description}',
                    parseFloat(prompt('Enter new price:', '${item.price.toFixed(2)}') || '${item.price}')
                )">Modify</button>
                <button onclick="window.removeItem(${item.id})">Remove</button>
            </div>
        `).join('');
    }
}

(window as any).modifyItem = modifyItem;
(window as any).removeItem = removeItem;

document.getElementById('add-item-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = (document.getElementById('item-name') as HTMLInputElement).value;
    const description = (document.getElementById('item-description') as HTMLInputElement).value;
    const price = parseFloat((document.getElementById('item-price') as HTMLInputElement).value);
    const quantity = parseInt((document.getElementById('item-quantity') as HTMLInputElement).value, 10);

    if (name && description && !isNaN(price) && !isNaN(quantity)) {
        addItem(name, description, price, quantity);
        (event.target as HTMLFormElement).reset();
    } else {
        alert('Please fill in all fields correctly.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    displayItems();
});
