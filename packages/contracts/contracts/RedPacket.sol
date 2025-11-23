// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract RedPacket {
  struct Packet {
    address sender; // 发红包的人
    uint256 amount; // 红包金额
    uint256 remainingAmount; // 剩余金额
    uint256 totalShares; // 总参与人数
    uint256 remainingShares; // 剩余参与人数
    bool isEqual; // 是否等额
  }

  // 红包ID计数器
  uint256 public nextPacketId;

  // 红包ID => 红包实例
  mapping(uint256 => Packet) public packets;

  // 账本：每个人针对一个红包只能领一次
  mapping(uint256 => mapping(address => uint256)) public claimed;

  event PacketCreated(
    uint256 indexed packetId,
    address indexed creator,
    uint256 totalAmount,
    uint256 totalShares,
    bool isEqual
  );

  event PacketGrabbed(
    uint256 indexed packetId,
    address indexed user,
    uint256 amount
  );

  // 创建一个红包
  function createPacket(uint256 totalShares, bool isEqual) external payable returns (uint256 packetId) {
    require(msg.value > 0, "Amount must be greater than 0");
    require(totalShares > 0, "Total shares must be greater than 0");

    if (isEqual) {
      require(msg.value % totalShares == 0, "Amount must be divisible by total shares");
    }

    packetId = ++nextPacketId;

    Packet storage p = packets[packetId];
    p.sender = msg.sender;
    p.amount = msg.value;
    p.remainingAmount = msg.value;
    p.totalShares = totalShares;
    p.remainingShares = totalShares;
    p.isEqual = isEqual;

    emit PacketCreated(packetId, msg.sender, msg.value, totalShares, isEqual);
  }

  // 抢红包
  function grab(uint256 packetId) external {
    Packet storage p = packets[packetId];
    require(p.remainingShares > 0, "No remaining shares");
    require(claimed[packetId][msg.sender] == 0, "Already claimed");

    uint256 amount;

    if (p.isEqual) {
      amount = p.amount / p.totalShares;
    } else {
      if (p.remainingShares == 1) {
        amount = p.remainingAmount;
      } else {
        // 二倍均值法
        uint256 avg = p.remainingAmount / p.remainingShares;
        uint256 max = avg * 2;
        if (max == 0) {
          max = 1;
        }

        uint256 rand = uint256(
          keccak256(
            abi.encodePacked(
              block.timestamp,
              block.prevrandao,
              msg.sender,
              p.remainingShares,
              p.remainingAmount
            )
          )
        );

        amount = (rand % max) + 1;

        uint256 maxAllowed = p.remainingAmount - (p.remainingShares - 1);
        if (amount > maxAllowed) {
          amount = maxAllowed;
        }
      }
    }

    require(amount > 0, "Amount must be greater than 0");
    require(amount <= p.remainingAmount, "Amount exceeds remaining amount");

    p.remainingAmount -= amount;
    p.remainingShares -= 1;
    claimed[packetId][msg.sender] = amount;
    (bool success,) = payable(msg.sender).call{value: amount}("");

    require(success, "RedPacket: transfer failed");

    emit PacketGrabbed(packetId, msg.sender, amount);
  }

  // 查看红包信息
  function checkPacket(uint256 packetId)
    external
    view
    returns (
      address sender,
      uint256 totalAmount,
      uint256 remainingAmount,
      uint256 totalShares,
      uint256 remainingShares,
      bool isEqual
    )
  {
    Packet storage p = packets[packetId];

    sender = p.sender;
    totalAmount = p.amount;
    remainingAmount = p.remainingAmount;
    totalShares = p.totalShares;
    remainingShares = p.remainingShares;
    isEqual = p.isEqual;
  }

  // 查看某个用户在某个红包中抢到多少
  function checkClaim(uint256 packetId, address user)
    external
    view
    returns (uint256)
  {
    return claimed[packetId][user];
  }
}
