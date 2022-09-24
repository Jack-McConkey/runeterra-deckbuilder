-- CreateTable
CREATE TABLE `Cards` (
    `id` VARCHAR(191) NOT NULL,
    `cardCode` VARCHAR(191) NOT NULL,
    `card` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Decks` (
    `id` VARCHAR(191) NOT NULL,
    `deckCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SelectedCards` (
    `id` VARCHAR(191) NOT NULL,
    `cardCode` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `deckId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SelectedCards` ADD CONSTRAINT `SelectedCards_deckId_fkey` FOREIGN KEY (`deckId`) REFERENCES `Decks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
