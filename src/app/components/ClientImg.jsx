"use client";

import Image from "next/image"
import { sanityClient } from "@/utils/sanity/lib/client"
import { useNextSanityImage } from "next-sanity-image"
import { urlForImage } from "@/utils/sanity/lib/image";


export default function ClientImg({ img, sizes, classes }) {
  const imageProps = useNextSanityImage(sanityClient, img, {
    imageBuilder: urlForImage
  });

  return (
    <Image
      {...imageProps}
      alt={img.alt}
      sizes={sizes}
      quality={100}
      placeholder="blur"
      blurDataURL={img.asset.metadata.lqip}
      className={classes}
    />
  )
}