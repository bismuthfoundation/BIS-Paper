const hdkey = require('hdkey')
const createHash = require('create-hash')
const bs58check = require('bs58check')
const bs58 = require('bs58')
const nacl = require('tweetnacl')
const { derivePath } = require('ed25519-hd-key')

const ECDSA_ADDRESS_VERSION = Buffer.from([0x4f, 0x54, 0x5b])
const ED25519_ADDRESS_VERSION = Buffer.from([0x03, 0xb8, 0x6c, 0xf3])

function getBs58() {
  return bs58.default || bs58
}

function getBs58check() {
  return bs58check.default || bs58check
}

function pubkeyToEcdsaAddress(publicKey) {
  const step2 = createHash('sha256').update(publicKey).digest()
  const step3 = createHash('rmd160').update(step2).digest()

  const payload = Buffer.concat([ECDSA_ADDRESS_VERSION, step3])
  return getBs58check().encode(payload)
}

function privateKeyToEcdsaWallet(privateKey) {
  const key = hdkey.fromMasterSeed(Buffer.alloc(32))
  key.privateKey = privateKey

  return {
    privateKey,
    publicKey: key.publicKey,
    address: pubkeyToEcdsaAddress(key.publicKey),
  }
}

function pubkeyToEd25519Address(publicKey) {
  const payload = Buffer.concat([ED25519_ADDRESS_VERSION, publicKey])
  const checksum = createHash('sha256').update(payload).digest().slice(0, 4)

  return getBs58().encode(Buffer.concat([payload, checksum]))
}

function privateKeyToEd25519Wallet(privateKey) {
  const pair = nacl.sign.keyPair.fromSeed(Uint8Array.from(privateKey))
  const publicKey = Buffer.from(pair.publicKey)

  return {
    privateKey,
    publicKey,
    address: pubkeyToEd25519Address(publicKey),
  }
}

function deriveEcdsaWallet(root, path) {
  const derived = root.derive(path)

  return {
    path,
    privateKey: derived.privateKey,
    publicKey: derived.publicKey,
    address: pubkeyToEcdsaAddress(derived.publicKey),
  }
}

function deriveEd25519Wallet(seed, path) {
  const derived = derivePath(path, seed.toString('hex'))
  const privateKey = Buffer.from(derived.key)
  const pair = privateKeyToEd25519Wallet(privateKey)

  return {
    path,
    privateKey,
    publicKey: pair.publicKey,
    address: pair.address,
  }
}

module.exports = {
  deriveEcdsaWallet,
  deriveEd25519Wallet,
  privateKeyToEcdsaWallet,
  privateKeyToEd25519Wallet,
  pubkeyToEcdsaAddress,
  pubkeyToEd25519Address,
}
