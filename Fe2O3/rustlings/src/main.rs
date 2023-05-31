fn main() {
    println!("{}", reply(":) ?"));
}

pub fn reply(message: &str) -> &str {
    if message.trim().is_empty() {
        return "Fine. Be that way!";
    }

    let arr = message
        .trim()
        .chars()
        .filter(|c| !c.is_whitespace())
        .collect::<Vec<_>>();
    let is_quest = arr[arr.len() - 1] == '?';
    let is_upper = arr[..arr.len() - 1]
        .iter()
        .all(|c| c.is_uppercase() || c.is_ascii_punctuation());
    let is_ascii = arr.iter().all(|c| c.is_ascii_punctuation());

    println!(
        "is_quest:{}, is_upper:{}, is_ascii:{}",
        is_quest, is_upper, is_ascii
    );

    if is_upper && is_quest && !is_ascii {
        "Calm down, I know what I'm doing!"
    } else if is_quest || is_ascii {
        "Sure."
    } else if is_upper {
        "Whoa, chill out!"
    } else {
        "Whatever."
    }
}
