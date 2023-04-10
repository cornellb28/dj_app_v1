const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Create a new track and trackAttribute
  const newTrack = await prisma.track.create({
    data: {
      name: 'My new track'
    }
  })
  const newTrackAttribute = await prisma.trackAttribute.create({
    data: {
      description: 'My new track attribute'
    }
  })

  // Update the track with the trackAttribute
  const updatedTrack = await prisma.track.update({
    where: {
      id: newTrack.id
    },
    data: {
      trackAttribute: {
        connect: {
          id: newTrackAttribute.id
        }
      }
    }
  })

  console.log(updatedTrack)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



// How to update BPM
async function main() {
  // Update the bpm field for a specific trackAttribute
  const updatedTrackAttribute = await prisma.trackAttribute.update({
    where: {
      id: 1 // Replace with the ID of the trackAttribute you want to update
    },
    data: {
      bpm: 120 // Replace with the new BPM value you want to set
    }
  })

  console.log(updatedTrackAttribute)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



// Javascript 
function updateTrackData(object, property, value) {
  object[property] = value;
  return object
}

const track = {
  title: "Art Talk",
  bpm: 92,
  artist: "Larry June"
}

console.log('Before:', track);

const updatedObject = updateTrackData(track, 'bpm', 99);

console.log('Before:', track);
