import { useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import contractABI from './Game.json';

function App() {
  const [assetId, setAssetId] = useState('');
  const [price, setPrice] = useState('');
  const [address,setAddress] = useState('');

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to wallet');
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('No Ethereum wallet found');
    }
  };

  const handleCreateAsset = async () => {
    const provider = new ethers.providers.AlchemyProvider();
    const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; // example address of a contract deployed on hardhat node
    const abi = contractABI; 
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const parsedAssetId = parseInt(assetId); 
      const parsedPrice = ethers.utils.parseEther(price); 
      const tx = await contract.createAsset(parsedAssetId, parsedPrice);
      await tx.wait();
      console.log('Asset created successfully');
    } catch (error) {
      console.error('Error creating asset:', error);
    }
  };

  const handleChangePrice = async () => {
    const provider = new ethers.providers.AlchemyProvider();
    const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; 
    const abi = contractABI; 
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const parsedAssetId = parseInt(assetId); 
      const parsedPrice = ethers.utils.parseEther(price); 
      const tx = await contract.changePrice(parsedAssetId, parsedPrice);
      await tx.wait();
      console.log('price changed!');
    } catch (error) {
      console.error('Error changing price:', error);
    }
  };

  const handleBuy = async () => {
    const provider = new ethers.providers.AlchemyProvider();
    const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; 
    const abi = contractABI; 
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const parsedAssetId = parseInt(assetId); 
      const tx = await contract.buy(parsedAssetId);
      await tx.wait();
      console.log('You bought the asset!');
    } catch (error) {
      console.error('Error buying asset:', error);
    }
  };

  const handleAddAdministrator = async () => {
    const provider = new ethers.providers.AlchemyProvider();
    const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; 
    const abi = contractABI; 
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const adminAddress = address;
      const tx = await contract.addAdministrator(adminAddress);
      await tx.wait();
      console.log('new administrator!');
    } catch (error) {
      console.error('Error: adding administrator failed', error);
    }
  };
  
  const handleTransferAsset = async () => {
    const provider = new ethers.providers.AlchemyProvider();
    const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; 
    const abi = contractABI; 
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const parsedAssetId = parseInt(assetId); 
      const tx = await contract.transfer(recipientAddress, parsedAssetId); 
      await tx.wait();
      console.log('Asset transferred successfully');
    } catch (error) {
      console.error('Error transferring asset:', error);
    }
  };
  
  return (
    <div>
      <h1>My Game Front End</h1>
      <h2>First, connect to your wallet:</h2>
      <button onClick={handleConnect}>Connect Wallet</button>
      <h2>Here you enter the asset ID:
        <br></br>
        enter price only for creating assets or changing price of an asset!
      </h2>
      <input type="text" placeholder="Enter asset ID" value={assetId} onChange={(e) => setAssetId(e.target.value)} /> <space></space>
      <input type="text" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <h2>Buy an asset, make sure you filled the asset ID and have sufficient ETH!</h2>
      <button onClick={handleBuy}>Buy Asset</button>
      <h2>Enter address to transfer assets/add new administrators</h2>
      <input type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <h2>These functions can be executed only by admins:</h2>
      <button onClick={handleCreateAsset}>Create Asset</button> <space></space>
      <button onClick={handleTransferAsset}>Transfer Asset</button> <space></space>
      <button onClick={handleChangePrice}>Change price</button> <space></space>
      <button onClick={handleAddAdministrator}>Add new admin</button>
    </div>
  );
}
export default App;