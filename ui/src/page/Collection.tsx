import { Layout } from "../Layout";
import { Container } from "../components/Container";
import { NftItem } from "../components/NftItem";
import { AINft } from "../services/models";

const nfts: AINft[] = [
  { id: "122", imageURL: "#" },
  { id: "123", imageURL: "#" },
];

export const Collection = () => {
  return (
    <Layout>
      <Container>
        <div className="relative overflow-hidden">
          <section className="">
            <div className="max-w-[1400px] relative h-[280px] mx-auto my-0 bg-[#272D37]/60 rounded-2xl border-3 border-solid border-[#0039FF] sm:h-[150px] md:mx-2 ">
              <div className="flex items-center justify-center w-full h-full">
                <h1 className=" font-body font-semibold text-5xl md:text-2xl">
                  My NFTs
                </h1>
              </div>
            </div>
          </section>
          <section className="max-w-[1200px] my-20 mx-auto grid grid-cols-3 md:grid-cols-2 gap-4 font-body  overflow-hidden top-7 md:gap-5 medium md:px-5 sm:grid-cols-1 sm:h-full relative justify-center items-center">
            {nfts?.map((nft, i) => <NftItem key={nft.id} nft={nft} />)}
          </section>
          {/* <Footer /> */}
        </div>
      </Container>
    </Layout>
  );
};
