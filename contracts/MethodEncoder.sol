pragma solidity ^0.8.0;

contract Encoder{




function getTheMethodId() public view returns(bytes4){
   return bytes4(keccak256("transfer(address,uint256)"));




}

}