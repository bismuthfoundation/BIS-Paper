# BIS-Paper

Hierarchical Deterministic wallet for Bismuth Crypto currency.

Full JS Version.


## Overview

- Generate any amount of keys from a single BIP39 mnemonic  
- Convert any seed into a BIP39 mnemonic (paperCode) and back.
- conforms to BIP44 

Auto build Github pages version: [https://angainordev.github.io/BIS-Paper/js/dist/index.html](https://angainordev.github.io/BIS-Paper/js/dist/index.html) 


## Derivation mechanism

BIP 39 - BIP44 - SLIP-0044

Coin type 209 was registered for Bismuth.

ECDSA and ED25519 addresses are supported.

## Paper codes

Paper codes allow to regenerate individual wallets without the master word pass.

## Tests 

See test directory for API and sample use.

WIP - left over from previous work, to be done.

## Changelog

- v0.3: Add ED25519 deterministic address generation support
- v0.2: Support for Chameleon wallet seeds (After september 2019) 
- v0.1: Initial commit, fully functional ECDSA support 

## Donation address

Donations will help us maintain and improve this tool and other ones

BIS Address
Bis1ZQxwgiXemim9MSmPpVUP2ykBAJTy1ncea  
![](https://github.com/AngainorDev/BIS-Paper/raw/master/angainor-bis.png)
