import * as constants from '@/store/constants'
import CourseContract from '@/contracts/Certifier.json'

const state = {
  provider: !!(window.web3 && window.web3.currentProvider),
  isOwner: false,
  contract: null,
  coinbase: null
}

const actions = {
  [constants.COURSE_INIT]: ({commit}) => {
    const abi = CourseContract.abi
    const contractAddress = '0x11589f14727997Df90f7668f4f095AAC0fA645FE'
    const contract = web3.eth.contract(abi).at(contractAddress)
    commit(constants.COURSE_SET_CONTRACT, contract)
    web3.eth.getCoinbase((error, coinbase) => {
      if(error) console.error(error)
      commit(constants.COURSE_SET_COINBASE, coinbase)
      contract.isOwner({from: coinbase}, (error, isOwner) => {
        if(error) console.error(error)
        commit(constants.COURSE_SET_IS_OWNER, isOwner)
      })
    })
  }
}

const mutations = {
  [constants.COURSE_SET_CONTRACT]: (state, contract) => {
    state.contract = contract
  },
  [constants.COURSE_SET_COINBASE]: (state, coinbase) => {
    state.coinbase = coinbase
  },
  [constants.COURSE_SET_IS_OWNER]: (state, isOwner) => {
    state.isOwner = isOwner
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}