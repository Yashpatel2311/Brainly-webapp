"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwitterContent = getTwitterContent;
exports.getYouTubeContent = getYouTubeContent;
const twitter_api_v2_1 = require("twitter-api-v2");
const googleapis_1 = require("googleapis");
const config_1 = require("../config");
// Initialize Twitter client
const twitterClient = new twitter_api_v2_1.TwitterApi({
    appKey: config_1.TWITTER_API_KEY,
    appSecret: config_1.TWITTER_API_SECRET,
    accessToken: config_1.TWITTER_ACCESS_TOKEN,
    accessSecret: config_1.TWITTER_ACCESS_SECRET,
});
// Initialize YouTube client
const youtube = googleapis_1.google.youtube({
    version: "v3",
    auth: config_1.YOUTUBE_API_KEY,
});
function getTwitterContent(tweetUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            // Extract tweet ID from URL
            const tweetId = (_a = tweetUrl.match(/status\/(\d+)/)) === null || _a === void 0 ? void 0 : _a[1];
            if (!tweetId) {
                throw new Error("Invalid Twitter URL");
            }
            // Get tweet details
            const tweet = yield twitterClient.v2.singleTweet(tweetId, {
                expansions: ["author_id", "referenced_tweets.id"],
                "tweet.fields": ["created_at", "public_metrics", "context_annotations"],
                "user.fields": ["name", "username"],
            });
            if (!tweet.data) {
                throw new Error("Tweet not found");
            }
            // Get author details
            const author = (_c = (_b = tweet.includes) === null || _b === void 0 ? void 0 : _b.users) === null || _c === void 0 ? void 0 : _c[0];
            const authorName = author
                ? `${author.name} (@${author.username})`
                : "Unknown author";
            // Get referenced tweets if any
            let referencedTweets = "";
            if ((_d = tweet.includes) === null || _d === void 0 ? void 0 : _d.tweets) {
                referencedTweets =
                    "\nReferenced tweets:\n" +
                        tweet.includes.tweets.map((t) => `- ${t.text}`).join("\n");
            }
            // Get metrics
            const metrics = tweet.data.public_metrics;
            const metricsText = metrics
                ? `\nMetrics: ${metrics.retweet_count} retweets, ${metrics.reply_count} replies, ${metrics.like_count} likes`
                : "";
            // Combine all information
            return `Tweet by ${authorName}:\n${tweet.data.text}${referencedTweets}${metricsText}`;
        }
        catch (error) {
            console.error("Error fetching Twitter content:", error);
            throw new Error("Failed to fetch Twitter content");
        }
    });
}
function getYouTubeContent(videoUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            // Extract video ID from URL
            const videoId = ((_a = videoUrl.match(/[?&]v=([^&]+)/)) === null || _a === void 0 ? void 0 : _a[1]) ||
                ((_b = videoUrl.match(/youtu\.be\/([^?]+)/)) === null || _b === void 0 ? void 0 : _b[1]);
            if (!videoId) {
                throw new Error("Invalid YouTube URL");
            }
            // Get video details
            const videoResponse = yield youtube.videos.list({
                part: ["snippet", "contentDetails", "statistics"],
                id: [videoId],
            });
            const video = (_c = videoResponse.data.items) === null || _c === void 0 ? void 0 : _c[0];
            if (!video) {
                throw new Error("Video not found");
            }
            const snippet = video.snippet;
            const statistics = video.statistics;
            // Get video description
            const description = (snippet === null || snippet === void 0 ? void 0 : snippet.description) || "No description available";
            // Get channel details
            const channelTitle = (snippet === null || snippet === void 0 ? void 0 : snippet.channelTitle) || "Unknown channel";
            // Get video statistics
            const stats = statistics
                ? `\nStatistics:\n` +
                    `- Views: ${statistics.viewCount}\n` +
                    `- Likes: ${statistics.likeCount}\n` +
                    `- Comments: ${statistics.commentCount}`
                : "";
            // Combine all information
            return (`YouTube video by ${channelTitle}:\n` +
                `Title: ${snippet === null || snippet === void 0 ? void 0 : snippet.title}\n` +
                `Description: ${description}\n` +
                `${stats}`);
        }
        catch (error) {
            console.error("Error fetching YouTube content:", error);
            throw new Error("Failed to fetch YouTube content");
        }
    });
}
