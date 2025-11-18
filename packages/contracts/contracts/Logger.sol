// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Logger {
  event DataWritten(address indexed sender, uint256 value, string note);

  function writeData(uint256 value, string calldata note) external {
    emit DataWritten(msg.sender, value, note);
  }
}
