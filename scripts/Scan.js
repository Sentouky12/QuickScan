const ethers = require('ethers');
const axios = require('axios');
async function main() {
const  RPC = "Your own RPC endpoint ";

const provider = new ethers.providers.JsonRpcProvider(RPC);
var AddressObject={};

var address='0xdAC17F958D2ee523a2206206994597C13D831ec7';
const apikey='Etherscan api key';
const url= `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apikey}`;
const res=await axios.get(url);
const abi=JSON.parse(res.data.result);

const usdt= new ethers.Contract(
address,
abi,
provider
);



var currentBlock=await provider.getBlockNumber();
console.log(currentBlock+"");
console.log('');
var startBlock=10350000;
var endBlock=currentBlock;
var totalblocks=endBlock-startBlock;
console.log("Scanning . . .");
for(var currentBlock=startBlock;currentBlock<=endBlock;currentBlock++){
var tx=await provider.getBlockWithTransactions(Number(currentBlock));
var receipt=await tx;
//console.log(receipt);
var txCount=tx.transactions.length;

if(tx.transactions == 0){
continue;
}else {
for(var currentTx = 0;currentTx < txCount; currentTx++ ){
    
if(tx.transactions[currentTx].to==null &&  tx.transactions[currentTx].data.indexOf('a9059cbb')>=0){
    //Search for any function signature you want.
    //just remove the 0x from the method id.
    var receipt=await provider.getTransactionReceipt(tx.transactions[currentTx].hash);
 //console.log(receipt);
 var contractAddress=await receipt.contractAddress;



if(AddressObject[contractAddress]==null){
AddressObject[contractAddress]=1;
var balance= ethers.utils.formatEther(await provider.getBalance(contractAddress));
var USDTbalance=parseInt(Number(await usdt.balanceOf(contractAddress)));
console.log("Contract address is "+contractAddress);
console.log("USDT balance is "+USDTbalance);
console.log("ETH balance is "+balance);
}


      }
     }  
    }


  }  
 


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });                                                                           
  