const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "loopqueue",
  description: "Зацикливание всей очереди",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["lq", "repeatqueue", "rq"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Сейчас ничего не играет...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Вы должны находиться в голосовом канале, чтобы использовать эту команду.!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "❌ | **Вы должны находиться в одном голосовом канале со мной, чтобы использовать эту команду.!**"
      );

    if (player.queueRepeat) {
      player.setQueueRepeat(false);
      client.sendTime(message.channel, `:repeat: Зацкливание очереди: \`Выключено\``);
    } else {
      player.setQueueRepeat(true);
      client.sendTime(message.channel, `:repeat: Зацкливание очереди:\`Включено\``);
    }
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Сейчас ничего не играет...**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Для использования этой команды вы должны находиться в голосовом канале.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(voiceChannel)
      )
        return client.sendTime(
          interaction,
          "❌ | **Вы должны находиться в одном голосовом канале со мной, чтобы использовать эту команду!**"
        );

      if (player.queueRepeat) {
        player.setQueueRepeat(false);
        client.sendTime(interaction, `:repeat: **Зацкливание очереди:** \`Выключено\``);
      } else {
        player.setQueueRepeat(true);
        client.sendTime(interaction, `:repeat: **Зацкливание очереди:** \`Включено\``);
      }
      console.log(interaction.data);
    },
  },
};
