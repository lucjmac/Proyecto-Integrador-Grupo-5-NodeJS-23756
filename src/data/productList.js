export const productList = [
    {
        code: "STW001001",
        name: "Baby Yoda Blueball",
        collection: "STAR WARS",
    },
    {
        code: "STW001002",
        name: "Boba Fett Fighter",
        collection: "STAR WARS",
    },
    {
        code: "STW001003",
        name: "Luke Skylwalker & Grogu",
        collection: "STAR WARS",
    },
    {
        code: "STW001004",
        name: "Stormtrooper Lightsaber",
        collection: "STAR WARS",
    },
    {
        code: "PKM001001",
        name: "Charmander Smiley",
        collection: "POKEMON",
    },
    {
        code: "STW001002",
        name: "Dragonite Hi!",
        collection: "POKEMON",
    },
    {
        code: "PKM001003",
        name: "Pidgeotto Flying",
        collection: "POKEMON",
    },
    {
        code: "PKM001004",
        name: "Pikachu Smiley",
        collection: "POKEMON",
    },
    {
        code: "PKM001005",
        name: "Vulpix Fancy",
        collection: "POKEMON",
    },
    {
        code: "HPT001001",
        name: "Harry Potter & Hegwid",
        collection: "HARRY POTTER",
    },
    {
        code: "HPT001002",
        name: "Herminione Ball Dress",
        collection: "HARRY POTTER",
    },
    {
        code: "HPT001003",
        name: "Luna Lovegood Lion Mask",
        collection: "HARRY POTTER",
    },
    {
        code: "HPT001004",
        name: "Snape Patronus",
        collection: "HARRY POTTER",
    },
];

productList.forEach((product, index) => {
    product.id = (index + 1).toString();
});