---
title: Description and architecture
sidebar_position: 2
---

Waku is a family of protocols that enable private, censorship-resistant communications; a suite of open-source software; and the name of the public, permissionless and decentralized network facilitating generalized messaging. By communications, we mean the exchange of data or messages between two or more entities, whether they are users, devices or nodes.

Waku was built as open-source public goods infrastructure to serve as the communications layer of the decentralized web. As such, its development focuses on the following:

- Generalized: Waku's focus on generalized and ephemeral messaging facilitates communication between users, subsystems or nodes according to developers' needs.

- Peer-to-peer: Waku is implemented via a decentralized p2p network, yielding the advantages of censorship resistance while remaining adaptive and scalable.

- Runs anywhere: Waku was designed to run in resource-restricted environments—like phones and browsers—enabling users operating lower-spec hardware or with intermittent bandwidth to participate as peers.

- Privacy first: Waku's strong privacy guarantees strengthen its resistance to censorship and external attack. Waku empowers developers to build apps that cannot harvest users' metadata, removing the need for users to trust that their data is not used without their permission.

- Modular: Waku's modularity enables developers to make tradeoffs according to their users' privacy expectations and performance demands by implementing only those protocols that are relevant to their applications. While one app might value privacy above all else, another may be willing to make compromises to deliver a more frictionless UX.

- Platform agnostic: Waku can run on any platform or in any environment making it a suitable messaging solution for decentralized applications regardless of the network on which they're deployed.

<br/>

### Network architecture

The Waku team has developed three clients to run in different environments along with a range of SDKs in Rust, React Native, Kotlin and Swift:

- nwaku: Waku's reference implementation written in Nim.
- go-waku: An implementation for native integration with Golang applications.
- js-waku: Waku's JavaScript implementation for browser environments.

Waku is best thought of as a cohesive whole in terms of its capabilities. However, under the hood are three distinct network interaction domains: gossip, discovery and request/response.

Waku compromises multiple protocols, including but not limited to the following:

**Waku Relay**: The heart of Waku v2, the relay protocol specifies a pub/sub approach to p2p messaging with a focus on privacy, censorship resistance, security and privacy, and is currently implemented as a minor extension of the libp2p GossipSub protocol.

**Waku Filter**: A lighter-weight version of the relay protocol for resource-restricted devices, Waku Filter enables light nodes to only receive the messages they want from full nodes.

**Waku Store**: Enables querying of messages stored by other nodes through Waku Relay.

**Waku Light Push**: A request/response protocol that enables nodes with short connection windows or limited bandwidth to publish messages to the Waku network

<br/>

[Dive into the docs](https://vac.dev/research)

[Continue reading](/team)
