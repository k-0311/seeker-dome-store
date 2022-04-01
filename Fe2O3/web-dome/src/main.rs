use mime::{Mime, APPLICATION_OCTET_STREAM};
use url::{ParseError, Url};
fn main() -> Result<(), ParseError> {
    let s = "https://github.com/rust-lang/rust/issues?labels=E-easy&state=open";
    let parsed = Url::parse(s)?;
    println!("{}", parsed.path());
    Ok(())
}
