# Smart Contract Audit Checklist

## Access Control
- [ ] Are admin functions protected?
- [ ] Is `onlyOwner` or role-based access used?
- [ ] Can ownership be transferred safely?

## Reentrancy
- [ ] External calls before state updates?
- [ ] Use of `nonReentrant`?
- [ ] Checks-Effects-Interactions followed?

## Storage Layout (Upgradeable)
- [ ] Storage gaps reserved?
- [ ] Variables order unchanged?
- [ ] No constructor (initializer used)?

## Gas Optimization
- [ ] Unnecessary storage writes?
- [ ] Use of `immutable` / `constant`?
- [ ] Loops optimized?

## Arithmetic
- [ ] Overflow/underflow handled?
- [ ] Solidity version >= 0.8?

## External Calls
- [ ] Safe handling of `.call()`?
- [ ] Return values checked?

## Denial of Service
- [ ] Unbounded loops?
- [ ] Blocking calls?

## Upgradeability
- [ ] UUPS / Transparent pattern correct?
- [ ] `_authorizeUpgrade` protected?

## Events
- [ ] Critical actions emit events?

## Selfdestruct / Delegatecall
- [ ] Any dangerous usage?