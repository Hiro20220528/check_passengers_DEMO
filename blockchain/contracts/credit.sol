// SPDX-License-Identifier: MIT
import "./verify.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

pragma solidity ^0.6.11;

library SafeMath {
  function add(uint16 a, uint16 b) internal pure returns (uint16 c) {
    c = a + b;
    assert(c >= a);
    return c;
  }
}

contract CarShareCreditRatingContract is Verifier, Ownable{
    using SafeMath for uint16;

    // コントラクトのオーナーがaddressに許可を与えたイベント
    event getPermission(address userAddress);

    // 証明の結果を知らせるイベント
    event noticeRsesult(bool proofResult);

    // ユーザーの使用履歴、検証成功の回数
    mapping (address => uint16) verifyCount;
    mapping (address => uint16) rentalCount;
    
    // ユーザーにidを順に振り分ける
    uint16 userNumber = 1;
    mapping (address => uint16) addressToid;
    mapping (uint16 => address) idToaddress;

    // サーバーがaddressにパスワードをかけ、全ての人が検証できないようにする
    mapping (address => bytes32) permissionAddress;

    // *******************************************************************************************************************************

    // 証明する
    function tryProof(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[1] memory publicInput, string  memory planeText) public {
        require(keccak256(abi.encodePacked(permissionAddress[msg.sender])) == keccak256(abi.encodePacked(keccak256(abi.encodePacked(planeText)))));

        // ゼロ知識証明をトライする
        try this.verifyProof(a, b, c, publicInput) returns (bool success){
            if (success) {
                verifyCount[msg.sender] = verifyCount[msg.sender].add(1);
                rentalCount[msg.sender] = rentalCount[msg.sender].add(1);
            } else {
                rentalCount[msg.sender] = rentalCount[msg.sender].add(1);
            }
            noticeRsesult(success);
        } catch {
            rentalCount[msg.sender] = rentalCount[msg.sender].add(1);
            noticeRsesult(false);
        }
    }

    // *******************************************************************************************************************************

    // コントラクトのオーナーがaddressに許可を与える
    function givePermission(address userAddress, bytes32 hashed_text) external onlyOwner {
        // 新規のユーザー作成を行う
        _giveUserId(userAddress);

        // ハッシュ値を知っている人(user)のみ証明をトライできるようにする
        permissionAddress[userAddress] = hashed_text;
        emit getPermission(userAddress); // サーバー側へ許可が与えられたことを知らせる
    }

    // 新規ユーザーの場合ユーザーidを付与する
    function _giveUserId(address userAddress) private {
        // require(addressToid[userAddress] == 0);
        if (addressToid[userAddress] == 0) {
            addressToid[userAddress] = userNumber;
            idToaddress[userNumber] = userAddress;
            userNumber ++;
        }
    }

    // *******************************************************************************************************************************

    // ユーザーidを返す
    function getUserId(address userAddress) public view returns(uint16) {
        return addressToid[userAddress];
    }

    // ユーザーaddressを返す
    function getUserAddress(uint16 userId) public view returns(address) {
        return idToaddress[userId];
    }

    // ユーザーの利用回数を返す
    function getUserRentalCount(address userAddress) public view returns(uint16) {
        return rentalCount[userAddress];
    }

    // ユーザーの証明回数を返す
    function getUserVerifyCount(address userAddress) public view returns(uint16) {
        return verifyCount[userAddress];
    }

    // ユーザーの信用度を返す -> フロント側で計算する
    function getUserCreditHistory(address userAddress) public view returns(uint16[2] memory) {
        uint16[2] memory userCreditHistory = [getUserRentalCount(userAddress), getUserVerifyCount(userAddress)];
        return  userCreditHistory;
    }

    // 全てのユーザーに対して行う
    function getAllUserCreditHistory() public view returns(uint16[2][] memory) {
        uint16[2][] memory allUserCreditHistory = new uint16[2][](userNumber);
        for(uint16 i = 0; i < userNumber - 1; i++){
            allUserCreditHistory[i] = getUserCreditHistory( idToaddress[i] );
        }
        return allUserCreditHistory;
    }
}