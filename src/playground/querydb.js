// 1-1 Track -> TrackAttribute
prisma.track.findMany({
    include: {
        trackAttribute: true
    }
}) 

// 1 to many Track --> Artists
prisma.track.findMany({
    include: {
        trackAttribute: true
    }
})