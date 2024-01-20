import { PromptTemplate } from "@langchain/core/prompts";

const initPromptTemplate = `You are the lead smart contract engineer who develops smart contract on aeternity blockchain,  the primary language it uses for executing the smart contracts on the blockchain is sophia , your job is to develop smart contract on the user demand . dont give explanation and only produce the code block , avoid doing syntax errors .


Example Output 1: "@compiler >= 6

include "Option.aes"
include "String.aes"

/// @title - Fungible token basic
contract FungibleToken =

  // This defines the state of type record encapsulating the contract's mutable state
  record state =
    {{ owner        : address      // the smart contract's owner address
    , total_supply : int          // total token supply
    , balances     : balances     // balances for each account
    , meta_info    : meta_info
    , minted : bool }}  // token meta info (name, symbol, decimals)

  // This is the meta-information record type
  record meta_info =
    {{ name     : string
    , symbol   : string
    , decimals : int }}

  // This is a type alias for the balances map
  type balances = map(address, int)

  // Declaration and structure of datatype event
  // and events that will be emitted on changes
  datatype event = Transfer(address, address, int)


  stateful entrypoint mint_coin(name: string, decimals : int, symbol : string, initial_owner_balance : option(int)) =
    require(state.minted == false, "The token is already minted")
    // If the name lenght is less than 1 symbol abort the execution
    require(String.length(name) >= 1, "STRING_TOO_SHORT_NAME")
    // If the symbol length is less than 1 symbol abort the execution
    require(String.length(symbol) >= 1, "STRING_TOO_SHORT_SYMBOL")
    // If the provided value for decimals is negative abort the execution
    require_non_negative_value(decimals)
    // If negative initial owner balance is passed, abort the execution
    let initial_supply = Option.default(0, initial_owner_balance)
    require_non_negative_value(initial_supply)

    let owner = Call.caller
    put(state{{ owner = owner,
      total_supply = initial_supply,
      balances     = Option.match({{}}, (balance) => {{ [owner] = balance }}, initial_owner_balance),
      meta_info    = {{ name = name, symbol = symbol, decimals = decimals }},
      minted = true }})
  // Create a fungible token with
  // the following name symbol and decimals
  // and set the inital smart contract state

  // For some reason Init don't initialize with mint values, But contract interface do so using seperate function to mint tokens...
  entrypoint init() =
    {{ owner        = Contract.address,
      total_supply = 0,
      balances     = {{}},
      meta_info    = {{ name = "", symbol = "", decimals = 0 }},
      minted = false }}

  // Get the token meta info
  entrypoint meta_info() : meta_info =
    state.meta_info

  // Get the token total supply
  entrypoint total_supply() : int =
    state.total_supply

  // Get the token owner address
  entrypoint owner() : address =
    state.owner

  // Get the balances state
  entrypoint balances() : balances =
    state.balances

  // Get balance for address of owner
  // returns option(int)
  // If the owner address haven't had any token balance
  // in this smart contract the return value is None
  // Otherwise Some(int) is returned with the current balance
  entrypoint balance(account: address) : option(int) =
    Map.lookup(account, state.balances)


  function require_non_negative_value(value : int) =
    require(value >= 0, "NON_NEGATIVE_VALUE_REQUIRED")

  function require_balance(account : address, value : int) =
    switch(balance(account))
      Some(balance) =>
        require(balance >= value, "ACCOUNT_INSUFFICIENT_BALANCE")
      None => abort("BALANCE_ACCOUNT_NOT_EXISTENT")

  stateful entrypoint internal_transfer(from_account: address, to_account: address, value: int) =
    require_non_negative_value(value)
    require_balance(from_account, value)
    put(state{{ balances[from_account] @ b = b - value }})
    put(state{{ balances[to_account = 0] @ b = b + value }})
    Chain.event(Transfer(from_account, to_account, value))   "


Example Output 2  : "
	
@compiler >= 6

include "String.aes"

contract CryptoHamster =

    record state = {{
        index : int, 
        map_hamsters : map(string, hamster), 
        testvalue: int}}

    record hamster = {{
        id : int,
        name : string,
        dna : int}}

    stateful entrypoint init() = 
        {{ index = 1,
            map_hamsters = {{}},
            testvalue = 42}}
    
    public entrypoint read_test_value() : int =
        state.testvalue
    
    public entrypoint return_caller() : address =
        Call.caller

    public entrypoint cause_error() : unit =
        require(2 == 1, "require failed") 

    public stateful entrypoint add_test_value(one: int, two: int) : int =
        put(state{{testvalue = one + two}})
        one + two
    
    public entrypoint locally_add_two(one: int, two: int) : int =
        one + two
    
    public stateful entrypoint statefully_add_two(one: int, two: int) : int=
        put(state{{testvalue = one + two}})
        state.testvalue
    
    stateful entrypoint create_hamster(hamster_name: string) =
        require(!name_exists(hamster_name), "Name is already taken")
        let dna : int = generate_random_dna(hamster_name)
        create_hamster_by_name_dna(hamster_name, dna)

    entrypoint name_exists(name: string) : bool =
        Map.member(name, state.map_hamsters)

    entrypoint get_hamster_dna(name: string, test: option(int)) : int =
        require(name_exists(name), "There is no hamster with that name!")

        let needed_hamster : hamster = state.map_hamsters[name]

        needed_hamster.dna

    private stateful function create_hamster_by_name_dna(name: string, dna: int) =
        let new_hamster : hamster = {{
            id = state.index,
            name = name,
            dna = dna}}

        put(state{{map_hamsters[name] = new_hamster}})
        put(state{{index = (state.index + 1)}})

    private function generate_random_dna(name: string) : int =
        get_block_hash_bytes_as_int() - Chain.timestamp + state.index

    private function get_block_hash_bytes_as_int() : int =
        switch(Chain.block_hash(Chain.block_height - 1))
            None => abort("blockhash not found")
            Some(bytes) => Bytes.to_int(bytes)

    entrypoint test(name: string) : hash =
        String.sha3(name)
"

Example Output 3 : "
contract FundMe =

  record spend_args = {{ recipient : address,
                        amount    : int }}

  record state = {{ contributions : map(address, int),
                   total         : int,
                   beneficiary   : address,
                   deadline      : int,
                   goal          : int }}

  stateful function spend(args : spend_args) =
    Chain.spend(args.recipient, args.amount)

  entrypoint init(beneficiary, deadline, goal) : state =
    {{ contributions = {{}},
      beneficiary   = beneficiary,
      deadline      = deadline,
      total         = 0,
      goal          = goal }}

  function is_contributor(addr) =
    Map.member(addr, state.contributions)

  stateful entrypoint contribute() =
    if(Chain.block_height >= state.deadline)
      spend({{ recipient = Call.caller, amount = Call.value }}) // Refund money
      false
    else
      let amount =
        switch(Map.lookup(Call.caller, state.contributions))
          None    => Call.value
          Some(n) => n + Call.value
      put(state{{ contributions[Call.caller] = amount,
                 total @ tot = tot + Call.value }})
      true

  stateful entrypoint withdraw() =
    if(Chain.block_height < state.deadline)
      abort("Cannot withdraw before deadline")
    if(Call.caller == state.beneficiary)
      withdraw_beneficiary()
    elif(is_contributor(Call.caller))
      withdraw_contributor()
    else
      abort("Not a contributor or beneficiary")

  stateful function withdraw_beneficiary() =
    require(state.total >= state.goal, "Project was not funded")
    spend({{recipient = state.beneficiary,
           amount    = Contract.balance }})

  stateful function withdraw_contributor() =
    if(state.total >= state.goal)
      abort("Project was funded")
    let to = Call.caller
    spend({{recipient = to,
           amount    = state.contributions[to]}})
    put(state{{ contributions @ c = Map.delete(to, c) }})
"


Input :  "{idea}"

Code :`;

const initPrompt = new PromptTemplate({
    inputVariables: ["idea"],
    template: initPromptTemplate,
});

const featurePromptTemplate = `You are the lead smart contract engineer for a company which uses sophia as it's primary language for writing smart contracts on aeternity blockchain  , your job is to implement the changes given by the user for making the changes in a particular smart contract  , you need to correct the syntax errors in the contract , add the features requested by the user into the smart contract. only give the code block and no explanation is required

Sample Changes  : "Add the function for adding two numbers in the smart contract"

Sample Contract  : "@compiler >= 6

contract NumberStorage =

  record state = {{
    owner : address,
    storedNumber : option(int)
    }}

  stateful entrypoint init() =
    {{ owner = Call.caller, storedNumber = None }}

  stateful entrypoint storeNumber(number: int) =
    require(Call.caller == state.owner, "Only the owner can store a number")
    put(state{{ storedNumber = Some(number) }})

  entrypoint getStoredNumber() : option(int) =
    state.storedNumber
"

Sample Output  : "
	@compiler >= 6

contract NumberStorage =

  record state = {{
    owner : address,
    storedNumber : option(int)
  }}

  stateful entrypoint init() =
    {{ owner = Call.caller, storedNumber = None }}

  stateful entrypoint storeNumber(number: int) =
    require(Call.caller == state.owner, "Only the owner can store a number")
    put(state{{ storedNumber = Some(number) }})

  entrypoint getStoredNumber() : option(int) =
    state.storedNumber

  function addTwoNumbers(a: int, b: int) : int =
    a + b

"


Changes  : {changes}

Contract  : {code}

Output  :`;

const featurePrompt = new PromptTemplate({
    inputVariables: ["changes", "code"],
    template: featurePromptTemplate,
});

const summaryPromptTemplate = `You are the lead smart contract engineer for a company which uses sophia as it's primary language for writing smart contracts on aeternity blockchain  , your job is to write a summary of the smart contract given by the user , you need to write the summary of the smart contract in the given text box , only give the summary and no explanation is required

Sample Contract: "@compiler >= 6 

contract NumberStorage =

  record state = {{
    owner : address,
    storedNumber : option(int)
    }}

  stateful entrypoint init() =
    {{ owner = Call.caller, storedNumber = None }}

  stateful entrypoint storeNumber(number: int) =
    require(Call.caller == state.owner, "Only the owner can store a number")
    put(state{{ storedNumber = Some(number) }})

  entrypoint getStoredNumber() : option(int) =
    state.storedNumber
"

Sample Output  : "NumberStorage is a smart contract that stores a number and allows the owner to retrieve it. The owner can also change the number. The owner can be anyone, but only the owner can change the number. The owner can also retrieve the number.
"

Contract  : {code}

Output  :`;

const summaryPrompt = new PromptTemplate({
    inputVariables: ["code"],
    template: summaryPromptTemplate,
});

const deployPrompt = `You are the lead smart contract engineer for a company which uses sophia as it's primary language for writing smart contracts on aeternity blockchain, your job is to give the sample initial values for the argument array of a sophia smart contract, you need to give the values for the argument array provided to you so that they can be deployed, only give the values and no explanation is required. Give real-world values that can be actually used in deployment. Here are a few example for the input-output, try to follow this structure and give only the output for the last problem.

sample init function argument array  : [f: int]
sample init function argument values  : [10]


sample init function argument array  : [initial_balance: int, name: string]
sample init function argument values  : [100, "Simple Token"]


sample init function argument array  : []
sample init function argument values  : []


sample init function argument array  : [buyer_address: address, price: int]
sample init function argument values  : ["ak_XsSLpN161dHo77k82CZHDnUCDpVG1JSujZjbGYhNKTgMy5exZ", 100]


init function argument array  : [city: string]
init function argument values  : ["New York"]

init function argument array  : {arguments}
init function argument values  : `;

const deployPromptTemplate = new PromptTemplate({
    inputVariables: ["arguments"],
    template: deployPrompt,
});

export { initPrompt, featurePrompt, summaryPrompt, deployPromptTemplate };
