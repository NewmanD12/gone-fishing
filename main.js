const prompt = require('prompt-sync')({sigint: true});

const SEPARATORS = '==========================================\n'

const MAX_WEIGHT = 50

const CUTOFF_TIME = 23

console.log(`You've gone fishing! Try to maximize the value of your caught fish. You can fish for 18 hours (til 2400 hours) and can catch at most ${MAX_WEIGHT} lbs of fish.\n`)

console.log(SEPARATORS)




const POSSIBLE_FISH = [
    {fish_name : 'trout', max_weight : 8, price_per_pound : 8},
    {fish_name : 'smallmouth bass', max_weight : 12, minumum_keep_weight : 4, price_per_pound : 22.5},
    {fish_name : 'largemouth bass', max_weight : 20, minumum_keep_weight : 5,  price_per_pound : 22.5},
    {fish_name : 'bluegill', max_weight : 4.5, minumum_keep_weight : 1, price_per_pound : 0.75},
    {fish_name : 'catfish', max_weight : 99, minumum_keep_weight : 5, price_per_pound : 13.49}
]

let fish_array = []
let total_weight = 0
let current_time = 6
let total_value = 0


while(current_time < CUTOFF_TIME){
    if(current_time === (CUTOFF_TIME - 1)){
        console.log(`The time is ${CUTOFF_TIME} hours. Times up!\n`)
        console.log(`You caught ${fish_array.length} fish`)
        for(let fish of fish_array){
            console.log(`* ${fish.fish}, ${fish.weight} lbs, $${fish.fish_value}`)
        }
        console.log(`Total weight: ${parseFloat(total_weight.toFixed(2))}`)
        console.log(`Total value: $${parseFloat(total_value.toFixed(2))}\n`)
    }   
    else {
        total_weight = find_total_weight()
        total_weight = parseFloat(total_weight.toFixed(2))
        total_value = parseFloat(total_value.toFixed(2))

        console.log(`The time is ${current_time} hours. So far you've caught:\n${fish_array.length} fish, ${total_weight} lbs, $${total_value}\n`)

        let fish_caught = Math.floor(Math.random() * POSSIBLE_FISH.length)

        let time_passed_rng = Math.floor(Math.random() * 90)

        let time_passed = time_passed_rng * .01666667

        current_time = parseFloat((current_time + time_passed).toFixed(2))

        let fish_name = POSSIBLE_FISH[fish_caught].fish_name

        let fish_caught_weight = parseFloat((Math.random() * POSSIBLE_FISH[fish_caught].max_weight).toFixed(2))

        let fish_min_weight = POSSIBLE_FISH[fish_caught].minumum_keep_weight

        let value = parseFloat((fish_caught_weight * POSSIBLE_FISH[fish_caught].price_per_pound).toFixed(2))

        console.log(`You caught a '${fish_name}' weighing ${fish_caught_weight} lb(s) and valued at $${value} that took ${time_passed_rng} minutes to catch.\n`)
        console.log(time_passed_rng, time_passed)
        console.log(current_time)

        if(total_weight + fish_caught_weight > MAX_WEIGHT){
            console.log(`This fish would put you over ${MAX_WEIGHT} lbs, so you release it.`)
            prompt('Press [enter] to continue\n')
            console.log(SEPARATORS)
        }
        else if (fish_caught_weight < fish_min_weight){
            console.log("This is just a little feller. So you throw it back.")
            prompt('Press [enter] to continue\n')
            console.log(SEPARATORS)
        }
        else{
             
            let user_action = prompt('Your action: [k]eep, [r]elease, or re[p]lace this fish with one currently in your inventory?\n>')
            if (user_action === 'k'){
                console.log('You chose to keep the fish.')
                console.log(SEPARATORS)
                fish_array.push({fish : fish_name, weight : fish_caught_weight, fish_value : value})
                total_weight += fish_caught_weight
                total_value += value
            }
            else if(user_action === 'r'){
                console.log('You chose to release the fish.\n')
                console.log(SEPARATORS)
            }
            else if(user_action === 'p'){
                for(let i = 0; i < fish_array.length; i++){
                    console.log(`${i + 1}. ${fish_array[i].fish}, ${fish_array[i].weight} lbs, $${fish_array[i].fish_value}`)
                }

                fish_to_replace = Number(prompt('Which fish would you like to replace?\n'))
                fish_array[fish_to_replace - 1] = {fish : fish_name, weight : fish_caught_weight, fish_value : value}
            }
            else {
                console.log('Error: Input not recognized')
            }
        }
    }
}

function find_total_weight(){
    res = 0
    for (let fish of fish_array){
        res += fish.weight
    }
    return res
}