use mini_redis::{client, Result};

#[tokio::main]
async fn main() -> Result<()> {
    let mut client = client::connect("127.0.0.1:6379").await?;
    client.set("dddd", "fuck world".into()).await?;
    let result = client.get("dddd").await?;
    println!("{:?}", result);
    Ok(())
}

async fn say_wo_cao()-> String{
    String::from("cao!")
}
