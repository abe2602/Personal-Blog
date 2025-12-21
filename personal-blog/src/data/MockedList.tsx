import { Post } from "../models/Post";

const mockedList = [
  new Post(
    "A Journey Through the Clouds",
    `From the moment the first light of dawn touches the horizon, the world below awakens in muted tones, yet above, the sky becomes a vast, living canvas of unimaginable beauty. Each cloud is not merely vapor; it is a story in motion, a living sculpture shaped by invisible winds, painted with the colors of sunrise that shift subtly from pale peach to flaming orange, to deep crimson, until the whole sky seems to vibrate with energy. There is an almost sacred stillness in the air as the first plane breaks through the misty veil, and with each inch of ascent, the hum of the engines becomes a rhythm, a heartbeat that synchronizes with the soul of the observer.

Flying above the clouds is not just a journey in space but a journey in thought. Below, the world is bustling, a mosaic of streets, rivers, and buildings, each teeming with life, stories, and untold dramas. Yet above, everything seems simultaneously infinite and intimate. One can trace the movement of each cloud, notice how shadows cast patterns over mountains, valleys, and oceans, and feel the gentle tug of gravity in a way that awakens both awe and humility. The higher one goes, the more the sky changes. Cirrus clouds stretch into wispy fingers, as if brushing the edges of the heavens, while cumulonimbus towers rise majestically, their tips glowing in the first light, hinting at storms brewing far below.

There is an element of meditation in this journey. Thoughts slow down and focus, attention shifts from trivialities to the bigger picture. Each moment demands presence: the delicate glimmer of ice crystals catching the light, the subtle color shifts of the sky as the sun rises higher, the whisper of the wind against the fuselage. It becomes clear that time itself behaves differently above the clouds; minutes stretch into eternity, and one begins to feel the strange paradox of moving yet standing still, seeing yet being unseen. Memories float alongside the clouds—childhood dreams of flying, the first time one looked out of a plane window, the stories imagined while staring at clouds from a meadow below.

The clouds themselves seem alive. At times they resemble mountains themselves, jagged and imposing, hinting at worlds untouchable, kingdoms of air and light. Other times they are soft, delicate, almost like the padding of a dream, inviting you to lay your thoughts upon them and feel the freedom of drifting without destination. Shapes change constantly: dragons, ships, mythical creatures, landscapes of impossible design, all fleeting, all ephemeral. Each shape invites reflection, imagination, and sometimes even revelation, as if the sky itself conspires to whisper secrets about life, about beauty, and about the transitory nature of all things.

The horizon is another marvel. The division between earth and sky blurs when the clouds are low and misty, giving the sensation of walking between worlds. As the sun climbs, the horizon seems to stretch infinitely, a line both tangible and abstract, reminding the observer that boundaries are often constructs, that perception is everything, and that the universe holds mysteries far beyond the reach of the human eye. Birds occasionally pierce this expanse, silhouettes against a glowing backdrop, their flight effortless and liberating, serving as reminders that freedom comes with understanding one’s own place in the sky.

Every journey above the clouds is also a personal journey. As the mind absorbs the majesty of the scene, emotions swell—joy, wonder, nostalgia, and sometimes a profound melancholy for the world left below, mundane yet precious. One contemplates not only the visible beauty but the invisible forces: the air currents shaping the clouds, the atmosphere’s composition, the sheer physics that allow flight. There is a sense of interconnectedness, of being part of something vast and mysterious, and yet intimately present in every fleeting moment. Writing, sketching, or simply observing becomes a ritual of gratitude for the world, for the senses, and for the opportunity to witness such celestial art.

Even the clouds’ shadows play their part. As they drift over the earth, mountains, forests, and oceans shift under soft darkness, creating a moving tapestry of light and shade. Cities below, which seemed chaotic moments before, now appear as small, orderly patterns, human activity dwarfed by the grandeur of nature. Rivers glint as veins of silver, lakes mirror the sky’s brilliance, and roads wind like threads in a tapestry, reminding the observer that all life moves in patterns, some predictable, some wonderfully chaotic. There is poetry in this, a story told without words, a music written in light, shape, and motion.

The journey continues long after the landing. The memory of the clouds lingers, searing a permanent imprint on perception. Ordinary landscapes now appear differently: a morning fog reminds one of aerial mist, rooftops evoke the shadows of clouds, and sunrises bring back the kaleidoscope of early-flight colors. The experience changes one subtly but indelibly, cultivating patience, imagination, and reverence for the small yet eternal wonders of the world. 

To fly above the clouds is to understand impermanence. The shapes that captivated the mind dissolve, the colors shift, and what was once awe-inspiring becomes a memory, a reference point for contemplation. Yet, even as clouds vanish, the lessons endure: to seek beauty, to be present, to acknowledge the fleeting and ephemeral nature of existence, and to treasure the moments when one feels both infinitesimal and infinite. And so, each flight becomes a meditation, a story, a whisper of the sky inviting the observer to partake in its quiet, boundless narrative.`,
    new Date("2024-01-10"),
    "https://picsum.photos/400/300?random=11"
  ),
  new Post(
    "Mysteries of the Forest",
    "A deep dive into the secrets hidden among towering trees and winding paths.",
    new Date("2024-01-12")
  ),
  new Post(
    "City Lights and Midnight Flights",
    "The city at night is alive with stories—here’s a peek into urban adventures.",
    new Date("2024-01-15")
  ),
  new Post(
    "The Forgotten Library",
    "Dusty shelves and ancient books tell tales of knowledge lost in time.",
    new Date("2024-01-17"),
    "https://picsum.photos/400/300?random=14"
  ),
  new Post(
    "Ocean Whispers",
    "Listening to the waves and discovering the rhythm of the sea.",
    new Date("2024-01-19"),
    "https://picsum.photos/400/300?random=15"
  ),
  new Post(
    "A Journey Through the Clouds",
    `From the moment the first light of dawn touches the horizon, the world below awakens in muted tones, yet above, the sky becomes a vast, living canvas of unimaginable beauty. Each cloud is not merely vapor; it is a story in motion, a living sculpture shaped by invisible winds, painted with the colors of sunrise that shift subtly from pale peach to flaming orange, to deep crimson, until the whole sky seems to vibrate with energy. There is an almost sacred stillness in the air as the first plane breaks through the misty veil, and with each inch of ascent, the hum of the engines becomes a rhythm, a heartbeat that synchronizes with the soul of the observer.

Flying above the clouds is not just a journey in space but a journey in thought. Below, the world is bustling, a mosaic of streets, rivers, and buildings, each teeming with life, stories, and untold dramas. Yet above, everything seems simultaneously infinite and intimate. One can trace the movement of each cloud, notice how shadows cast patterns over mountains, valleys, and oceans, and feel the gentle tug of gravity in a way that awakens both awe and humility. The higher one goes, the more the sky changes. Cirrus clouds stretch into wispy fingers, as if brushing the edges of the heavens, while cumulonimbus towers rise majestically, their tips glowing in the first light, hinting at storms brewing far below.

There is an element of meditation in this journey. Thoughts slow down and focus, attention shifts from trivialities to the bigger picture. Each moment demands presence: the delicate glimmer of ice crystals catching the light, the subtle color shifts of the sky as the sun rises higher, the whisper of the wind against the fuselage. It becomes clear that time itself behaves differently above the clouds; minutes stretch into eternity, and one begins to feel the strange paradox of moving yet standing still, seeing yet being unseen. Memories float alongside the clouds—childhood dreams of flying, the first time one looked out of a plane window, the stories imagined while staring at clouds from a meadow below.

The clouds themselves seem alive. At times they resemble mountains themselves, jagged and imposing, hinting at worlds untouchable, kingdoms of air and light. Other times they are soft, delicate, almost like the padding of a dream, inviting you to lay your thoughts upon them and feel the freedom of drifting without destination. Shapes change constantly: dragons, ships, mythical creatures, landscapes of impossible design, all fleeting, all ephemeral. Each shape invites reflection, imagination, and sometimes even revelation, as if the sky itself conspires to whisper secrets about life, about beauty, and about the transitory nature of all things.

The horizon is another marvel. The division between earth and sky blurs when the clouds are low and misty, giving the sensation of walking between worlds. As the sun climbs, the horizon seems to stretch infinitely, a line both tangible and abstract, reminding the observer that boundaries are often constructs, that perception is everything, and that the universe holds mysteries far beyond the reach of the human eye. Birds occasionally pierce this expanse, silhouettes against a glowing backdrop, their flight effortless and liberating, serving as reminders that freedom comes with understanding one’s own place in the sky.

Every journey above the clouds is also a personal journey. As the mind absorbs the majesty of the scene, emotions swell—joy, wonder, nostalgia, and sometimes a profound melancholy for the world left below, mundane yet precious. One contemplates not only the visible beauty but the invisible forces: the air currents shaping the clouds, the atmosphere’s composition, the sheer physics that allow flight. There is a sense of interconnectedness, of being part of something vast and mysterious, and yet intimately present in every fleeting moment. Writing, sketching, or simply observing becomes a ritual of gratitude for the world, for the senses, and for the opportunity to witness such celestial art.

Even the clouds’ shadows play their part. As they drift over the earth, mountains, forests, and oceans shift under soft darkness, creating a moving tapestry of light and shade. Cities below, which seemed chaotic moments before, now appear as small, orderly patterns, human activity dwarfed by the grandeur of nature. Rivers glint as veins of silver, lakes mirror the sky’s brilliance, and roads wind like threads in a tapestry, reminding the observer that all life moves in patterns, some predictable, some wonderfully chaotic. There is poetry in this, a story told without words, a music written in light, shape, and motion.

The journey continues long after the landing. The memory of the clouds lingers, searing a permanent imprint on perception. Ordinary landscapes now appear differently: a morning fog reminds one of aerial mist, rooftops evoke the shadows of clouds, and sunrises bring back the kaleidoscope of early-flight colors. The experience changes one subtly but indelibly, cultivating patience, imagination, and reverence for the small yet eternal wonders of the world. 

To fly above the clouds is to understand impermanence. The shapes that captivated the mind dissolve, the colors shift, and what was once awe-inspiring becomes a memory, a reference point for contemplation. Yet, even as clouds vanish, the lessons endure: to seek beauty, to be present, to acknowledge the fleeting and ephemeral nature of existence, and to treasure the moments when one feels both infinitesimal and infinite. And so, each flight becomes a meditation, a story, a whisper of the sky inviting the observer to partake in its quiet, boundless narrative.`,
    new Date("2024-01-10"),
    "https://picsum.photos/400/300?random=11"
  ),
  new Post(
    "Desert Dreams",
    "Golden sands, endless horizons, and the magic of the desert at sunset.",
    new Date("2024-01-23"),
    "https://picsum.photos/400/300?random=17"
  ),
  new Post(
    "Rainy Day Reverie",
    "Finding calm and creativity in the pitter-patter of rain.",
    new Date("2024-01-25"),
    "https://picsum.photos/400/300?random=18"
  ),
  new Post(
    "Aurora Nights",
    "Chasing the northern lights and marveling at nature’s light show.",
    new Date("2024-01-27"),
    "https://picsum.photos/400/300?random=19"
  ),
  new Post(
    "Hidden Canyons",
    "Exploring secret canyons carved over millennia by wind and water.",
    new Date("2024-01-29"),
    "https://picsum.photos/400/300?random=20"
  ),
  new Post(
    "Cherry Blossom Chronicles",
    "Spring blooms and fleeting beauty captured in delicate pink petals.",
    new Date("2024-02-01"),
    "https://picsum.photos/400/300?random=21"
  ),
  new Post(
    "Twilight Reflections",
    "The calm moments between day and night inspire introspection.",
    new Date("2024-02-03"),
    "https://picsum.photos/400/300?random=22"
  ),
];

export default mockedList;
