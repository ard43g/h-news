export default function dateConvert(time) {
    return new Date(time * 1000).toLocaleString("en-GB");
}
